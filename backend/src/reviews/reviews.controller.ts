import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Get('dentist/:dentistId')
  findByDentist(@Param('dentist_id') dentist_id: string) {
    return this.reviewsService.findByDentist(+dentist_id);
  }

  @Get('dentist/:dentistId/average')
  getAverageRating(@Param('dentist_id') dentist_id: string) {
    return this.reviewsService.getAverageRating(+dentist_id);
  }

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.delete(+id);
  }
}