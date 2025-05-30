import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Dentist } from '../dentists/dentists.entity';

@Entity('services')
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Dentist)
    @JoinColumn({ name: 'dentist_id' })
    dentist_id: Dentist;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    text: string;

    @Column({ type: 'int' })
    price: number;

    @Column({ name: 'photo_url', type: 'varchar', length: 255, nullable: true })
    photoUrl: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}