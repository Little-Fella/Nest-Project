import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Appointment)
  @JoinColumn({ name: 'appointment_id' })
  appointment_id: Appointment;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'payment_method', type: 'varchar', length: 50 })
  payment_method: string;

  @Column({ name: 'payment_date', type: 'timestamp' })
  payment_date: Date;

  @Column({ type: 'varchar', length: 50 })
  status: string;
}