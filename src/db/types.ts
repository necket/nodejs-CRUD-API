export type UserHobby = string;

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: UserHobby[];
}

export type UserDto = Omit<User, 'id'>;
