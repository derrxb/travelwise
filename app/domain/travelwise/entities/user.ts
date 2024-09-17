import type { User as UserORM } from '@prisma/client';
import { UserProfileDTO, UserProfileEntity } from './user-profile';

export class UserEntity {
  id?: UserORM['id'];
  username?: UserORM['username'];
  email?: UserORM['email'];
  password?: UserORM['password'];
  createdAt?: UserORM['createdAt'];
  updatedAt?: UserORM['updatedAt'];
  isOnboarded?: UserORM['isOnboarded'];
  UserProfile: UserProfileEntity;

  constructor(user: UserORM & { UserProfile: UserProfileEntity }) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.isOnboarded = user.isOnboarded;
    this.UserProfile = user.UserProfile;
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
      UserProfile: this.UserProfile?.json(),
    } as UserDTO;
  }
}

export type UserDTO = Pick<UserEntity, 'email' | 'id' | 'username' | 'isOnboarded'> & {
  createdAt?: string;
  updatedAt?: string;
  UserProfile: UserProfileDTO;
};
