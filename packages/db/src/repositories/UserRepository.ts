import { PrismaClient } from '@prisma/client';
import { User, UserId } from '@voyageai/types';

export interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(entity: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
}

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: UserId): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
    });
    if (!user) return null;
    return this.mapToDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email, deletedAt: null },
    });
    if (!user) return null;
    return this.mapToDomain(user);
  }

  async create(entity: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email: entity.email,
      },
    });
    return this.mapToDomain(user);
  }

  private mapToDomain(prismaUser: any): User {
    return {
      id: prismaUser.id as UserId,
      email: prismaUser.email,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    };
  }
}
