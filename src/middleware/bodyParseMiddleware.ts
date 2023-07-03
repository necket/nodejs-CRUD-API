import { IncomingMessage, ServerResponse } from 'http';

declare module 'http' {
  interface IncomingMessage {
    body: Record<string, any>;
  }
}

export const bodyParseMiddleware = (req: IncomingMessage, res: ServerResponse<IncomingMessage>, next: () => void) => {
  let data = '';

  req.on('data', (chunk) => {
    data += chunk.toString();
  });

  req.on('end', () => {
    req.body = data ? JSON.parse(data) : undefined;
    next();
  });
};
