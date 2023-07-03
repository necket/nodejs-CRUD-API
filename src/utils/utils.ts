import { ServerResponse, IncomingMessage } from 'http';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { UserDto } from '../db/types';

export const sendResponce = (res: ServerResponse, code: number, data: unknown) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = code;
  res.end(JSON.stringify(data));
};

export const sendError = (res: ServerResponse, code: number, error?: string) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = code;
  res.end(JSON.stringify({ error }));
};

export const isValidUserId = (uuid?: string) => {
  if (!uuid) return false;
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

export const isUrlWithId = (url?: string) => {
  const regex = /\/api\/users\/([0-9a-fA-F-]+)$/;
  return regex.test(url ?? '');
};

export const getUserId = (req: IncomingMessage) => {
  const regex = /\/api\/users\/([0-9a-fA-F-]+)$/;
  const userId = req.url?.match(regex)?.[1];

  const isValid = isValidUserId(userId);

  if (!userId || !isValid) return undefined;

  return userId;
};

export const isValidUserDto = (dto: UserDto) => {
  return (
    typeof dto.username === 'string' &&
    typeof dto.age === 'number' &&
    Array.isArray(dto.hobbies) &&
    dto.hobbies.every((hobby) => typeof hobby === 'string')
  );
};
