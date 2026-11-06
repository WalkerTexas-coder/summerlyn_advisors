import { handleArtRequest } from '../../server/art/http';

export function GET(request: Request): Promise<Response> | Response {
  return handleArtRequest(request);
}
