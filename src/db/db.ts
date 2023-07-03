import { v4 as uuid } from 'uuid';
import { User, UserDto } from './types';

class UserDb {
  private users: User[];

  constructor() {
    this.users = [];
  }

  private findOne = (id: string) => {
    return this.users.find((user) => user.id === id);
  };

  private findOneOrFail = (id: string) => {
    const user = this.findOne(id);
    if (!user) throw new Error(`User with id: ${id} not found`);
    return user;
  };

  public getUsers = () => {
    return this.users;
  };

  public getOneUser = (id: string) => {
    return this.findOneOrFail(id);
  };

  public createUser = (userDto: UserDto) => {
    const id = uuid();
    const createdUser = { id, ...userDto };
    this.users = [...this.users, createdUser];
    return createdUser;
  };

  public updateUser = (id: string, userDto: UserDto) => {
    const userToUpdate = this.findOneOrFail(id);
    const updatedUser = { ...userToUpdate, ...userDto };
    this.users = this.users.map((user) => (user.id === userToUpdate.id ? updatedUser : user));
    return updatedUser;
  };

  public deleteUser = (id: string) => {
    const userToDelete = this.findOneOrFail(id);
    this.users = this.users.filter((user) => user.id !== userToDelete.id);
    return null;
  };
}

export const repository = new UserDb();
