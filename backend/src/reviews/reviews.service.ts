import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './reviews.entity';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async findAll(): Promise<Review[]> {
    return this.reviewsRepository.query(`
      SELECT r.*, 
             p.first_name as patient_first_name,
             p.last_name as patient_last_name,
             d.first_name as dentist_first_name,
             d.last_name as dentist_last_name
      FROM reviews r
      JOIN patients p ON r.patient_id = p.id
      JOIN dentists d ON r.dentist_id = d.id
    `);
  }

  async findOne(id: number): Promise<Review> {
    const [result] = await this.reviewsRepository.query(
      `SELECT r.*, 
              p.first_name as patient_first_name,
              p.last_name as patient_last_name,
              d.first_name as dentist_first_name,
              d.last_name as dentist_last_name
       FROM reviews r
       JOIN patients p ON r.patient_id = p.id
       JOIN dentists d ON r.dentist_id = d.id
       WHERE r.id = $1`,
      [id]
    );
    return result;
  }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const result = await this.reviewsRepository.query(
      `INSERT INTO reviews 
       (patient_id, dentist_id, rating, comment) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [
        createReviewDto.patient_id,
        createReviewDto.dentist_id,
        createReviewDto.rating,
        createReviewDto.comment
      ],
    );
    return result[0];
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const result = await this.reviewsRepository.query(
      `UPDATE reviews 
       SET rating = $1, comment = $2
       WHERE id = $3 
       RETURNING *`,
      [
        updateReviewDto.rating,
        updateReviewDto.comment,
        id
      ],
    );
    return result[0];
  }

  async delete(id: number): Promise<void> {
    await this.reviewsRepository.query(
      'DELETE FROM reviews WHERE id = $1', 
      [id]
    );
  }

  async findByDentist(dentist_id: number): Promise<Review[]> {
    return this.reviewsRepository.query(
      `SELECT r.*, 
              p.first_name as patient_first_name,
              p.last_name as patient_last_name
       FROM reviews r
       JOIN patients p ON r.patient_id = p.id
       WHERE r.dentist_id = $1`,
      [dentist_id]
    );
  }

  async getAverageRating(dentist_id: number): Promise<number> {
    const result = await this.reviewsRepository.query(
      `SELECT AVG(rating) as average 
       FROM reviews 
       WHERE dentist_id = $1`,
      [dentist_id]
    );
    return parseFloat(result[0].average) || 0;
  }
}