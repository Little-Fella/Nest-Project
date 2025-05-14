import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('dentists')
export class Dentist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  first_name: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  last_name: string;

  @Column({ type: 'varchar', length: 255 })
  specialization: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'hire_date', type: 'date' })
  hire_date: Date;

  @Column({ name: 'photo_url', type: 'varchar', length: 512, nullable: true })
  photo_url: string;

  @Column({ type: 'text', nullable: true })
  bio: string;
}