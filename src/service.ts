import { repository } from './db/db';

export const getAllUsers = () => {
  return repository.getUsers();
};
