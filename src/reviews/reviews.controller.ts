import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './review.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}

  @Post()
  create(@Body() data: Partial<Review>) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const review = await this.service.findOne(+id);
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Review>) {
    const updated = await this.service.update(+id, data);
    if (!updated) throw new NotFoundException('Review not found for update');
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.service.remove(+id);
    if (!result) throw new NotFoundException('Review not found for deletion');
    return { message: 'Review deleted successfully' };
  }
}
