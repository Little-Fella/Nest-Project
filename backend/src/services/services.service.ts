import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.query('SELECT * FROM services');
  }

  async findOne(id: number): Promise<Service> {
    const [service] = await this.serviceRepository.query(
      'SELECT * FROM services WHERE id = $1',
      [id],
    );
    return service;
  }

  async create(serviceData: Omit<Service, 'id'>): Promise<Service> {
    const { name, description, price, duration_minutes } = serviceData;
    const [newService] = await this.serviceRepository.query(
      `INSERT INTO services (name, description, price, duration_minutes)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, description, price, duration_minutes],
    );
    return newService;
  }

  async update(id: number, serviceData: Partial<Service>): Promise<Service> {
    const { name, description, price, duration_minutes } = serviceData;
    const [updatedService] = await this.serviceRepository.query(
      `UPDATE services 
       SET name = $1, description = $2, price = $3, duration_minutes = $4
       WHERE id = $5 RETURNING *`,
      [name, description, price, duration_minutes, id],
    );
    return updatedService;
  }

  async delete(id: number): Promise<void> {
    await this.serviceRepository.query('DELETE FROM services WHERE id = $1', [id]);
  }
}