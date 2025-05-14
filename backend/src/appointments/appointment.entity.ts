import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { Dentist } from '../dentists/dentist.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Dentist)
  @JoinColumn({ name: 'dentist_id' })
  dentist: Dentist;

  @Column({ name: 'appointment_date', type: 'date' })
  appointment_date: Date;

  @Column({ name: 'appointment_time', type: 'time' })
  appointment_time: string;

  @Column({ type: 'text' })
  reason: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}