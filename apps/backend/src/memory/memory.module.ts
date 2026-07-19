import { Module } from '@nestjs/common';
import { TravelJournalService } from './travel-journal.service';

@Module({
  providers: [TravelJournalService],
  exports: [TravelJournalService],
})
export class MemoryModule {}
