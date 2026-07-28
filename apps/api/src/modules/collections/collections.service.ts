import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class CollectionsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(userId: string, data: any) {
    return this.prisma.collection.create({
      data: {
        userId,
        title: data.title,
        isPublic: data.isPublic || false,
      }
    });
  }

  async findAll(userId: string) {
    return this.prisma.collection.findMany({
      where: { userId },
      include: {
        destinations: {
          include: { destination: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(id: string, userId: string, data: any) {
    return this.prisma.collection.update({
      where: { id, userId },
      data: {
        title: data.title,
        isPublic: data.isPublic
      }
    });
  }

  async remove(id: string, userId: string) {
    return this.prisma.collection.delete({
      where: { id, userId }
    });
  }

  async addDestination(id: string, destinationId: string, userId: string) {
    // Check collection exists and is owned
    const coll = await this.prisma.collection.findFirst({ where: { id, userId }});
    if (!coll) throw new NotFoundException('Collection not found');

    return this.prisma.collectionDestination.create({
      data: {
        collectionId: id,
        destinationId
      }
    });
  }

  async removeDestination(id: string, destinationId: string, userId: string) {
    const coll = await this.prisma.collection.findFirst({ where: { id, userId }});
    if (!coll) throw new NotFoundException();

    // deleteMany in case there's somehow duplicates, though schema has unique index
    return this.prisma.collectionDestination.deleteMany({
      where: { collectionId: id, destinationId }
    });
  }
}
