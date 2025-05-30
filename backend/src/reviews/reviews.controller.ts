import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.services';
import { Review } from './reviews.entity';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Get()
    findAll() {
        return this.reviewsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const review = await this.reviewsService.findOne(+id);
        if (!review) {
            throw new NotFoundException('Review not found');
        }
        return review;
    }

    @Get('grade/:grade')
    async findByGrade(
        @Param('grade') grade: string,
        @Query('min') minGrade?: string,
        @Query('max') maxGrade?: string
    ) {
        if (grade) {
            const reviews = await this.reviewsService.findByGrade(+grade);
            if (reviews.length === 0) {
                return { message: 'No reviews found with this grade' };
            }
            return reviews;
        }

        if (minGrade || maxGrade) {
            const min = minGrade ? +minGrade : 0;
            const max = maxGrade ? +maxGrade : 5;
            return this.reviewsService.findByGradeRange(min, max);
        }

        return { message: 'Please specify grade or grade range' };
    }

    @Get('patient/:patient_id')
    async findByPatientId(@Param('patient_id') patientId: string) {
        const reviews = await this.reviewsService.findByPatientId(+patientId);
        if (reviews.length === 0) {
            return { message: 'No reviews found for this patient' };
        }
        return reviews;
    }

    @Post()
    create(@Body() review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) {
        return this.reviewsService.create(review);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() review: Partial<Review>) {
        return this.reviewsService.update(+id, review);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reviewsService.remove(+id);
    }
}