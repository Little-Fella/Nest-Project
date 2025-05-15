import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AppointmentService } from '../app_serv/appointment-service.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'int' })
  duration_minutes: number;

  @OneToMany(() => AppointmentService, appointmentService => appointmentService.service)
  appointmentServices: AppointmentService[];
}
