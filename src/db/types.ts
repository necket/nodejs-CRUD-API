export type UserHobby = string;

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: UserHobby[];
}

export type CreateUserDto = Omit<User, 'id'>;

export type UpdateUserDto = Partial<User>;
