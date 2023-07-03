import http from 'http';
import { router } from './router';
import { bodyParseMiddleware } from './middleware/bodyParseMiddleware';
import { sendError } from './utils/utils';

export const app = (port: number) => {
  const server = http.createServer((req, res) => {
    bodyParseMiddleware(req, res, () => {
      router(req, res);
    });
  });

  server.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
};
