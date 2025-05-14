import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dentist } from './dentist.entity';
import { DentistsService } from './dentists.service';
import { DentistsController } from './dentists.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dentist])],
  providers: [DentistsService],
  controllers: [DentistsController],
})
export class DentistsModule {}