import { IncomingMessage, ServerResponse } from 'http';
import { getUsers, getUser, createUser, updateUser, deleteUser } from './handlers';
import { sendError, isUrlWithId } from './utils/utils';

export const router = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const url = req.url;
  const method = req.method;

  if (url === '/api/users' && method === 'GET') {
    getUsers(req, res);
  } else if (isUrlWithId(url) && method === 'GET') {
    getUser(req, res);
  } else if (url === '/api/users' && method === 'POST') {
    createUser(req, res);
  } else if (isUrlWithId(url) && method === 'PUT') {
    updateUser(req, res);
  } else if (isUrlWithId(url) && method === 'DELETE') {
    deleteUser(req, res);
  } else {
    sendError(res, 404, 'Unknown endpoint or method');
  }
};
