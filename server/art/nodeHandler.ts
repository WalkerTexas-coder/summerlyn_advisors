import { handleArtRequest } from './http';
import { json } from './respond';

type NodeResponse = {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (body?: string | Uint8Array) => void;
};

type NodeRequest = {
  method?: string;
  url?: string;
  headers: Record<string, string | string[] | undefined> | Headers;
  [Symbol.asyncIterator]?: () => AsyncIterator<unknown>;
};

function headerValue(headers: NodeRequest['headers'], name: string): string | null {
  if (typeof (headers as Headers).get === 'function') return (headers as Headers).get(name);
  const value = (headers as Record<string, string | string[] | undefined>)[name] ?? (headers as Record<string, string | string[] | undefined>)[name.toLowerCase()];
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

function isWebRequest(value: unknown): value is Request {
  return typeof Request !== 'undefined' && value instanceof Request;
}

async function nodeToRequest(req: NodeRequest): Promise<Request> {
  const host = headerValue(req.headers, 'x-forwarded-host') ?? headerValue(req.headers, 'host') ?? 'localhost';
  const proto = headerValue(req.headers, 'x-forwarded-proto') ?? 'https';
  const url = new URL(req.url ?? '/', `${proto}://${host}`);
  const headers = new Headers();
  if (typeof (req.headers as Headers).forEach === 'function') {
    (req.headers as Headers).forEach((value, key) => headers.set(key, value));
  } else {
    for (const [key, value] of Object.entries(req.headers as Record<string, string | string[] | undefined>)) {
      if (typeof value === 'string') headers.set(key, value);
      else if (Array.isArray(value)) headers.set(key, value.join(', '));
    }
  }
  const method = req.method ?? 'GET';
  let body: Buffer | undefined;
  if (method !== 'GET' && method !== 'HEAD' && req[Symbol.asyncIterator]) {
    const chunks: Buffer[] = [];
    for await (const chunk of req as AsyncIterable<unknown>) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk as Uint8Array));
    }
    body = Buffer.concat(chunks);
  }
  return new Request(url, {
    method,
    headers,
    body: method === 'GET' || method === 'HEAD' ? undefined : body,
  });
}

/**
 * Vercel `/api` routes on this project invoke a default Node handler `(req, res)`.
 * Newer runtimes pass a Web `Request` and expect a `Response`. This accepts either.
 */
export async function artApiHandler(input: Request | NodeRequest, res?: NodeResponse): Promise<Response | void> {
  try {
    const request = isWebRequest(input) ? input : await nodeToRequest(input);
    const response = await handleArtRequest(request);
    if (!isWebRequest(input) && res) {
      res.statusCode = response.status;
      response.headers.forEach((value, key) => res.setHeader(key, value));
      res.end(Buffer.from(await response.arrayBuffer()));
      return;
    }
    return response;
  } catch {
    const failure = json({ error: 'server_error' }, 500);
    if (!isWebRequest(input) && res) {
      res.statusCode = 500;
      res.setHeader('content-type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ error: 'server_error' }));
      return;
    }
    return failure;
  }
}
