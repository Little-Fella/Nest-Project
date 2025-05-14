import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.query(`
      SELECT p.*, a.appointment_date, a.appointment_time
      FROM payments p
      JOIN appointments a ON p.appointment_id = a.id
    `);
  }

  async findOne(id: number): Promise<Payment> {
    const [result] = await this.paymentsRepository.query(
      `SELECT p.*, a.appointment_date, a.appointment_time
       FROM payments p
       JOIN appointments a ON p.appointment_id = a.id
       WHERE p.id = $1`,
      [id]
    );
    return result;
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const result = await this.paymentsRepository.query(
      `INSERT INTO payments 
       (appointment_id, amount, payment_method, payment_date, status) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [
        createPaymentDto.appointment_id,
        createPaymentDto.amount,
        createPaymentDto.payment_method,
        createPaymentDto.payment_date || new Date(),
        createPaymentDto.status || 'pending'
      ],
    );
    return result[0];
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const result = await this.paymentsRepository.query(
      `UPDATE payments 
       SET appointment_id = $1, amount = $2, payment_method = $3, 
           payment_date = $4, status = $5
       WHERE id = $6 
       RETURNING *`,
      [
        updatePaymentDto.appointment_id,
        updatePaymentDto.amount,
        updatePaymentDto.payment_method,
        updatePaymentDto.payment_date,
        updatePaymentDto.status || 'pending',
        id
      ],
    );
    return result[0];
  }

  async delete(id: number): Promise<void> {
    await this.paymentsRepository.query(
      'DELETE FROM payments WHERE id = $1', 
      [id]
    );
  }

  async findByAppointment(appointmentId: number): Promise<Payment[]> {
    return this.paymentsRepository.query(
      `SELECT * FROM payments WHERE appointment_id = $1`,
      [appointmentId]
    );
  }
}