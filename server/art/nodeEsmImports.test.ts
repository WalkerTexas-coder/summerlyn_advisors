import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

function listTypeScriptFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...listTypeScriptFiles(full));
    else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.test.ts')) files.push(full);
  }
  return files;
}

interface Specifier {
  file: string;
  specifier: string;
  typeOnly: boolean;
}

function specifiersIn(file: string): Specifier[] {
  const source = readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const found: Specifier[] = [];
  const visit = (node: ts.Node) => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      const typeOnly = ts.isImportDeclaration(node) ? node.importClause?.isTypeOnly === true : node.isTypeOnly === true;
      found.push({ file, specifier: node.moduleSpecifier.text, typeOnly });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return found;
}

function resolveSpecifier(fromFile: string, specifier: string): string | null {
  if (!specifier.startsWith('.')) return null;
  const base = path.resolve(path.dirname(fromFile), specifier);
  const stem = base.replace(/\.js$/, '');
  for (const candidate of [stem + '.ts', stem + '.tsx', base]) {
    try {
      readFileSync(candidate);
      return candidate;
    } catch {
      // try the next candidate
    }
  }
  return base;
}

/**
 * Vercel compiles api/*.ts with module NodeNext and leaves import specifiers
 * unchanged. package.json `"type": "module"` then makes Node resolve them as
 * ESM, which rejects extensionless relative paths (ERR_MODULE_NOT_FOUND) and
 * the function dies as FUNCTION_INVOCATION_FAILED.
 */
describe('art API Node ESM imports', () => {
  it('uses .js extensions on every relative value import in the function graph', () => {
    const roots = [
      ...listTypeScriptFiles(path.join(repoRoot, 'api')),
      ...listTypeScriptFiles(path.join(repoRoot, 'server')),
    ];
    const seen = new Set<string>();
    const missing: string[] = [];
    const queue = [...roots];
    while (queue.length > 0) {
      const file = queue.pop()!;
      if (seen.has(file) || file.endsWith('.test.ts')) continue;
      seen.add(file);
      for (const item of specifiersIn(file)) {
        if (!item.specifier.startsWith('.')) continue;
        const resolved = resolveSpecifier(file, item.specifier);
        if (resolved && !seen.has(resolved)) queue.push(resolved);
        if (!item.typeOnly && !item.specifier.endsWith('.js')) {
          missing.push(`${path.relative(repoRoot, file)} -> ${item.specifier}`);
        }
      }
    }
    expect(missing).toEqual([]);
  });
});
