import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  async findAll(): Promise<Patient[]> {
    return this.patientsRepository.query('SELECT * FROM patients');
  }

  async findOne(id: number): Promise<Patient> {
    const [result] = await this.patientsRepository.query(
      'SELECT * FROM patients WHERE id = $1', 
      [id]
    );
    return result;
  }

  async create(patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> {
    const result = await this.patientsRepository.query(
      `INSERT INTO patients 
       (first_name, last_name, birth_date, phone, email) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [
        patient.first_name,
        patient.last_name,
        patient.birth_date,
        patient.phone,
        patient.email
      ],
    );
    return result[0];
  }

  async update(id: number, patient: Partial<Patient>): Promise<Patient> {
    const result = await this.patientsRepository.query(
      `UPDATE patients 
       SET first_name = $1, last_name = $2, birth_date = $3, 
           phone = $4, email = $5 
       WHERE id = $6 
       RETURNING *`,
      [
        patient.first_name,
        patient.last_name,
        patient.birth_date,
        patient.phone,
        patient.email,
        id
      ],
    );
    return result[0];
  }

  async delete(id: number): Promise<void> {
    await this.patientsRepository.query(
      'DELETE FROM patients WHERE id = $1', 
      [id]
    );
  }
}