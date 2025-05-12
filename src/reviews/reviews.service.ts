import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly repo: Repository<Review>,
  ) {}

  async create(reviewData: Partial<Review>): Promise<Review> {
    const review = this.repo.create(reviewData);
    return this.repo.save(review);
  }

  findAll(): Promise<Review[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<Review | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, data: Partial<Review>): Promise<Review | null> {
    const review = await this.repo.findOneBy({ id });
    if (!review) return null;
    Object.assign(review, data);
    return this.repo.save(review);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return !!result.affected && result.affected > 0;
  }
}
