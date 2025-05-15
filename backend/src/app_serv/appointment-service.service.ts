import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentService } from './appointment-service.entity';
import { CreateAppointmentServiceDto } from '../dto/create-appointment-service.dto';
import { AppointmentServiceResponseDto } from '../dto/appointment-service-response.dto';

@Injectable()
export class AppointmentServicesService {
  constructor(
    @InjectRepository(AppointmentService)
    private readonly appointmentServiceRepository: Repository<AppointmentService>,
  ) {}

  async create(createDto: CreateAppointmentServiceDto): Promise<AppointmentServiceResponseDto> {
    const [newAppointmentService] = await this.appointmentServiceRepository.query(
      `INSERT INTO appointments_services (appointment_id, service_id)
       VALUES ($1, $2) RETURNING *`,
      [createDto.appointment_id, createDto.service_id],
    );
    return new AppointmentServiceResponseDto(newAppointmentService);
  }

  async findByAppointmentId(appointment_id: number): Promise<AppointmentServiceResponseDto[]> {
    const results = await this.appointmentServiceRepository.query(
      `SELECT * FROM appointments_services WHERE appointment_id = $1`,
      [appointment_id],
    );
    return results.map(r => new AppointmentServiceResponseDto(r));
  }

  async findByServiceId(service_id: number): Promise<AppointmentServiceResponseDto[]> {
    const results = await this.appointmentServiceRepository.query(
      `SELECT * FROM appointments_services WHERE service_id = $1`,
      [service_id],
    );
    return results.map(r => new AppointmentServiceResponseDto(r));
  }

  async remove(id: number): Promise<void> {
    await this.appointmentServiceRepository.query(
      `DELETE FROM appointments_services WHERE id = $1`,
      [id],
    );
  }

  async removeByAppointmentAndService(
    appointmentId: number,
    serviceId: number,
  ): Promise<void> {
    await this.appointmentServiceRepository.query(
      `DELETE FROM appointments_services 
       WHERE appointment_id = $1 AND service_id = $2`,
      [appointmentId, serviceId],
    );
  }
}