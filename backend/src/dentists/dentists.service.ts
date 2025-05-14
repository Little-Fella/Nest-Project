import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dentist } from './dentist.entity';

@Injectable()
export class DentistsService {
  constructor(
    @InjectRepository(Dentist)
    private dentistsRepository: Repository<Dentist>,
  ) {}

  async findAll(): Promise<Dentist[]> {
    return this.dentistsRepository.query('SELECT * FROM dentists');
  }

  async findOne(id: number): Promise<Dentist> {
    const [result] = await this.dentistsRepository.query(
      'SELECT * FROM dentists WHERE id = $1', 
      [id]
    );
    return result;
  }

  async create(dentist: Omit<Dentist, 'id'>): Promise<Dentist> {
    const result = await this.dentistsRepository.query(
      `INSERT INTO dentists 
       (first_name, last_name, specialization, phone, email, hire_date, photo_url, bio) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [
        dentist.first_name,
        dentist.last_name,
        dentist.specialization,
        dentist.phone,
        dentist.email,
        dentist.hire_date,
        dentist.photo_url,
        dentist.bio
      ],
    );
    return result[0];
  }

  async update(id: number, dentist: Partial<Dentist>): Promise<Dentist> {
    const result = await this.dentistsRepository.query(
      `UPDATE dentists 
       SET first_name = $1, last_name = $2, specialization = $3,
           phone = $4, email = $5, hire_date = $6,
           photo_url = $7, bio = $8
       WHERE id = $9 
       RETURNING *`,
      [
        dentist.first_name,
        dentist.last_name,
        dentist.specialization,
        dentist.phone,
        dentist.email,
        dentist.hire_date,
        dentist.photo_url,
        dentist.bio,
        id
      ],
    );
    return result[0];
  }

  async delete(id: number): Promise<void> {
    await this.dentistsRepository.query(
      'DELETE FROM dentists WHERE id = $1', 
      [id]
    );
  }
}