import prisma from '~/infrastructure/database/index.server';
import type { UserDTO } from '../entities/user';
import { UserEntity } from '../entities/user';

export class UserRepository {
  static async rebuildEntity(data: any) {
    if (!data || typeof data === 'undefined') {
      return undefined;
    }

    return new UserEntity({
      ...data,
    });
  }

  static async findByUserId(userId: number) {
    const result = await prisma.user.findFirst({
      where: { id: userId },
    });

    return await this.rebuildEntity(result);
  }

  static async findUserByUsername(username: string) {
    const result = await prisma.user.findFirst({
      where: { username: username },
    });

    return await this.rebuildEntity(result);
  }

  static async findByEmail(email: string) {
    const result = await prisma.user.findFirst({
      where: { email },
    });

    return await this.rebuildEntity(result);
  }

  static async updateUserPassword(user: UserEntity, hashedPassword: string) {
    const result = await prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: user.id },
    });

    return await this.rebuildEntity(result);
  }

  static async updateUser(user: UserEntity, data: Partial<UserDTO>) {
    const result = await prisma.user.update({
      data: {
        ...data,
      },
      where: { id: user.id },
    });

    return await this.rebuildEntity(result);
  }
}
