import { spawnSync } from 'node:child_process';
import { mkdtempSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

/**
 * Vercel compiles these routes with module NodeNext because the root tsconfig
 * has no `module` setting, and `"type": "module"` makes the output ESM.
 * Extensionless relative imports then crash the isolate during module load
 * (`ERR_MODULE_NOT_FOUND`) before `artApiHandler` can respond, which is the
 * platform `FUNCTION_INVOCATION_FAILED` response.
 */
describe('Vercel ESM emit of /api/art/catalog', () => {
  it('loads the compiled function and returns the closed catalog', () => {
    const outDir = mkdtempSync(join(tmpdir(), 'art-vercel-emit-'));
    const root = process.cwd();
    const options: ts.CompilerOptions = {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      rootDir: root,
      outDir,
      strict: false,
      skipLibCheck: true,
      esModuleInterop: true,
    };
    const entry = join(root, 'api/art/catalog.ts');
    const program = ts.createProgram({ rootNames: [entry], options });
    const unresolved = ts.getPreEmitDiagnostics(program).filter((diagnostic) => diagnostic.code === 2835 || diagnostic.code === 2307);
    expect(unresolved.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, ' '))).toEqual([]);
    const emitted = program.emit();
    expect(emitted.emitSkipped).toBe(false);

    writeFileSync(join(outDir, 'package.json'), JSON.stringify({ type: 'module' }));
    symlinkSync(join(root, 'node_modules'), join(outDir, 'node_modules'));

    const catalogUrl = pathToFileURL(join(outDir, 'api/art/catalog.js')).href;
    const child = spawnSync(process.execPath, ['--input-type=module', '-e', `
      const mod = await import(${JSON.stringify(catalogUrl)});
      const catalog = await mod.GET(new Request('https://www.summerlynadvisors.com/api/art/catalog'));
      const catalogBody = await catalog.json();
      const checkout = await mod.default(new Request('https://www.summerlynadvisors.com/api/art/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ workId: 'test-work', sizeId: 'test-size', quantity: 1 }),
      }));
      const webhook = await mod.default(new Request('https://www.summerlynadvisors.com/api/art/webhook', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{}',
      }));
      const sent = { statusCode: 0, body: '', headers: {} };
      await mod.default({
        method: 'GET',
        url: '/api/art/catalog',
        headers: { host: 'www.summerlynadvisors.com', 'x-forwarded-proto': 'https' },
      }, {
        set statusCode(value) { sent.statusCode = value; },
        get statusCode() { return sent.statusCode; },
        setHeader(name, value) { sent.headers[name] = value; },
        end(body) { sent.body = Buffer.from(body ?? '').toString('utf8'); },
      });
      console.log(JSON.stringify({
        catalogStatus: catalog.status,
        catalogBody,
        checkoutStatus: checkout.status,
        checkoutBody: await checkout.json(),
        webhookStatus: webhook.status,
        webhookBody: await webhook.json(),
        nodeStatus: sent.statusCode,
        nodeBody: JSON.parse(sent.body),
      }));
    `], { encoding: 'utf8' });

    expect(child.status, child.stderr || child.stdout).toBe(0);
    const result = JSON.parse(child.stdout);
    expect(result).toEqual({
      catalogStatus: 200,
      catalogBody: { salesOpen: false, works: [] },
      checkoutStatus: 503,
      checkoutBody: { error: 'checkout_unavailable' },
      webhookStatus: 400,
      webhookBody: { error: 'invalid_signature' },
      nodeStatus: 200,
      nodeBody: { salesOpen: false, works: [] },
    });
  });
});
