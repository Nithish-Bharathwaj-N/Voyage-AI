import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class SavedPlacesService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async save(userId: string, destinationId: string, notes?: string) {
    return this.prisma.savedDestination.upsert({
      where: {
        userId_destinationId: { userId, destinationId }
      },
      update: { notes },
      create: { userId, destinationId, notes }
    });
  }

  async findAll(userId: string) {
    return this.prisma.savedDestination.findMany({
      where: { userId },
      include: { destination: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async remove(userId: string, destinationId: string) {
    return this.prisma.savedDestination.delete({
      where: {
        userId_destinationId: { userId, destinationId }
      }
    });
  }
}
