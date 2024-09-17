import type { User as UserORM } from '@prisma/client';

export class UserEntity {
  id?: UserORM['id'];
  username?: UserORM['username'];
  email?: UserORM['email'];
  password?: UserORM['password'];
  createdAt?: UserORM['createdAt'];
  updatedAt?: UserORM['updatedAt'];
  isOnboarded?: UserORM['isOnboarded'];

  constructor(user: UserORM) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.isOnboarded = user.isOnboarded;
  }

  isEqual(user: UserEntity) {
    return this.id === user.id;
  }

  json(): UserDTO {
    return {
      createdAt: this.createdAt,
      email: this.email,
      id: this.id,
      username: this.username,
      isOnboarded: this.isOnboarded,
    } as UserDTO;
  }
}

export type UserDTO = Pick<UserEntity, 'email' | 'id' | 'username' | 'isOnboarded'> & {
  createdAt?: string;
  updatedAt?: string;
};
