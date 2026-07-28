import { PrismaClient } from '@prisma/client';
import { PrismaTripRepository } from '../repositories/TripRepository';
import { PrismaDestinationRepository } from '../repositories/DestinationRepository';

/**
 * Unit of Work interface abstracting the ORM transaction.
 */
export interface UnitOfWork {
  trips: PrismaTripRepository;
  destinations: PrismaDestinationRepository;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

/**
 * Service to execute workflows within a transactional boundary.
 */
export class TransactionManager {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Executes a callback within a Prisma transaction.
   * By passing the transactional Prisma client (`tx`) to the repositories,
   * all operations run in a single ACID transaction.
   */
  async execute<T>(work: (uow: UnitOfWork) => Promise<T>): Promise<T> {
    return await this.prisma.$transaction(async (tx) => {
      // Create transient repository instances bound to the transaction
      const uow: UnitOfWork = {
        trips: new PrismaTripRepository(tx as PrismaClient),
        destinations: new PrismaDestinationRepository(tx as PrismaClient),
        commit: async () => { /* Prisma handles this implicitly on success */ },
        rollback: async () => { throw new Error('MANUAL_ROLLBACK'); },
      };

      try {
        return await work(uow);
      } catch (error: any) {
        if (error.message === 'MANUAL_ROLLBACK') {
          throw new Error('Transaction rolled back by application logic');
        }
        throw error; // Re-throw to trigger Prisma rollback
      }
    });
  }
}
