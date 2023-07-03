import http from 'http';
import { router } from './router';
import { bodyParseMiddleware } from './middleware/bodyParseMiddleware';

export const app = async (port: number) => {
  const server = http.createServer((req, res) => {
    bodyParseMiddleware(req, res, () => {
      router(req, res);
    });
  });

  server.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });

  return { exit: () => server.close() };
};
