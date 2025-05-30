import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.services';
import { Review } from './reviews.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Review])],
    controllers: [ReviewsController],
    providers: [ReviewsService],
})
export class ReviewsModule {}