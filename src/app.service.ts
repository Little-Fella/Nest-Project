import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './reviews/review.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  getHello(): string {
    return 'Hello from AppService!';
  }

  findAll(): Promise<Review[]> {
    return this.reviewsRepository.query('SELECT * FROM reviews');
  }

  findOne(id: number): Promise<Review> {
    return this.reviewsRepository.query('SELECT * FROM reviews WHERE id = $1', [id]);
  }

  create(review: Partial<Review>): Promise<Review> {
    return this.reviewsRepository.query(
      'INSERT INTO reviews (patient_id, dentist_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [review.patientId, review.dentistId, review.rating, review.comment],
    );
  }

  async update(id: number, review: Partial<Review>): Promise<Review> {
    await this.reviewsRepository.query(
      'UPDATE reviews SET patient_id = $1, dentist_id = $2, rating = $3, comment = $4 WHERE id = $5',
      [review.patientId, review.dentistId, review.rating, review.comment, id],
    );
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.reviewsRepository.query('DELETE FROM reviews WHERE id = $1', [id]);
  }
}
