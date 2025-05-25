// patients.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.patientsRepository.find();
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async findByEmail(email: string): Promise<Patient | null> {
    return this.patientsRepository.findOne({ 
      where: { email },
      select: ['id', 'first_name', 'last_name', 'email', 'password', 'birth_date', 'phone', 'createdAt', 'updatedAt']
    });
  }

  async create(patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> {
    const newPatient = this.patientsRepository.create(patient);
    return this.patientsRepository.save(newPatient);
  }

  async update(id: number, patient: Partial<Patient>): Promise<Patient> {
    const existingPatient = await this.findOne(id); // Используем findOne, который уже проверяет наличие
    const updatedPatient = this.patientsRepository.merge(existingPatient, patient);
    return this.patientsRepository.save(updatedPatient);
  }

  async delete(id: number): Promise<void> {
    const result = await this.patientsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }
}