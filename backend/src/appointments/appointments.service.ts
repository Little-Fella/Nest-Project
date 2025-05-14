import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentsRepository.query(`
      SELECT a.*, 
             p.first_name as patient_first_name, 
             p.last_name as patient_last_name,
             d.first_name as dentist_first_name,
             d.last_name as dentist_last_name
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN dentists d ON a.dentist_id = d.id
    `);
  }

  async findOne(id: number): Promise<Appointment> {
    const [result] = await this.appointmentsRepository.query(
      `SELECT a.*, 
            p.first_name as patient_first_name, 
            p.last_name as patient_last_name,
            d.first_name as dentist_first_name,
            d.last_name as dentist_last_name
       FROM appointments a
       JOIN patients p ON a.patient_id = p.id
       JOIN dentists d ON a.dentist_id = d.id
       WHERE a.id = $1`,
      [id]
    );
    return result;
  }

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const result = await this.appointmentsRepository.query(
      `INSERT INTO appointments 
       (patient_id, dentist_id, appointment_date, appointment_time, reason, status) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [
        createAppointmentDto.patient_id,
        createAppointmentDto.dentist_id,
        createAppointmentDto.appointment_date,
        createAppointmentDto.appointment_time,
        createAppointmentDto.reason,
        createAppointmentDto.status || 'scheduled'
      ],
    );
    return result[0];
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const result = await this.appointmentsRepository.query(
      `UPDATE appointments 
       SET patient_id = $1, dentist_id = $2, appointment_date = $3, 
           appointment_time = $4, reason = $5, status = $6
       WHERE id = $7 
       RETURNING *`,
      [
        updateAppointmentDto.patient_id,
        updateAppointmentDto.dentist_id,
        updateAppointmentDto.appointment_date,
        updateAppointmentDto.appointment_time,
        updateAppointmentDto.reason,
        updateAppointmentDto.status,
        id
      ],
    );
    return result[0];
  }

  async delete(id: number): Promise<void> {
    await this.appointmentsRepository.query(
      'DELETE FROM appointments WHERE id = $1', 
      [id]
    );
  }
}