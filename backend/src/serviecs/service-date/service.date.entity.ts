import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Service } from '../services.entity';

@Entity('service_dates')
export class ServiceDate {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Service)
    @JoinColumn({ name: 'service_id' })
    service: Service;

    @Column({ type: 'date' })
    service_date: Date;

    @Column({ type: 'varchar', length: 50 })
    service_time: string;
}