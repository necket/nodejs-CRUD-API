import { IncomingMessage, ServerResponse } from 'http';
import { repository } from './db/db';
import { sendResponce, getUserId, sendError, isValidUserDto } from './utils/utils';
import { UserDto } from './db/types';

export type RequestHandler = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void;

export const getUsers: RequestHandler = (req, res) => {
  const users = repository.getUsers();
  sendResponce(res, 200, users);
};

export const getUser: RequestHandler = (req, res) => {
  const userId = getUserId(req);

  if (!userId) {
    sendError(res, 400, 'Invalid user id');
    return;
  }

  try {
    repository.getOneUser(userId);
  } catch (error: any) {
    sendError(res, 404, error.message);
    return;
  }

  try {
    const user = repository.getOneUser(userId);
    sendResponce(res, 200, user);
  } catch (error: any) {
    sendError(res, 500, `Internal server error: ${error.message}`);
  }
};

export const createUser: RequestHandler = (req, res) => {
  const dto = req.body as UserDto;
  const isValid = isValidUserDto(dto);

  if (!isValid) {
    sendError(res, 400, 'Invalid user fields');
    return;
  }

  try {
    const createdUser = repository.createUser(dto);
    sendResponce(res, 201, createdUser);
  } catch (error: any) {
    sendError(res, 500, `Internal server error: ${error.message}`);
    return;
  }
};

export const updateUser: RequestHandler = (req, res) => {
  const userId = getUserId(req);
  const dto = req.body as UserDto;
  const isValid = isValidUserDto(dto);

  if (!userId || !isValid) {
    sendError(res, 400, 'Invalid user id');
    return;
  }

  try {
    repository.getOneUser(userId);
  } catch (error: any) {
    sendError(res, 404, error.message);
    return;
  }

  try {
    const updatedUser = repository.updateUser(userId, dto);
    sendResponce(res, 200, updatedUser);
  } catch (error: any) {
    sendError(res, 500, `Internal server error: ${error.message}`);
  }
};

export const deleteUser: RequestHandler = (req, res) => {
  const userId = getUserId(req);

  if (!userId) {
    sendError(res, 400, 'Invalid user id');
    return;
  }

  try {
    repository.getOneUser(userId);
  } catch (error: any) {
    sendError(res, 404, error.message);
    return;
  }

  try {
    repository.deleteUser(userId);
    sendResponce(res, 204, {});
  } catch (error: any) {
    sendError(res, 500, `Internal server error: ${error.message}`);
  }
};
