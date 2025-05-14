import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PatientsModule } from '../patients/patients.module';
import { DentistsModule } from '../dentists/dentists.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    PatientsModule,
    DentistsModule
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}