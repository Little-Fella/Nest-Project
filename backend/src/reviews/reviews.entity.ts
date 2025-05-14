import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { Dentist } from '../dentists/dentist.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient_id: Patient;

  @ManyToOne(() => Dentist)
  @JoinColumn({ name: 'dentist_id' })
  dentist_id: Dentist;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}