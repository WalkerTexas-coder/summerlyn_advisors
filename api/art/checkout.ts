import { handleArtRequest } from '../../server/art/http';

export function POST(request: Request): Promise<Response> | Response {
  return handleArtRequest(request);
}
