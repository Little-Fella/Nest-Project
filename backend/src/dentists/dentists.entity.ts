import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Clinic } from '../clinics/clinics.entity';

@Entity('dentists')
export class Dentist {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', type: 'varchar', length: 100 })
    first_name: string;

    @Column({ name: 'last_name', type: 'varchar', length: 100 })
    last_name: string;

    @Column({ type: 'varchar', length: 100 })
    specialization: string;

    @ManyToOne(() => Clinic)
    @JoinColumn({ name: 'clinic_id' })
    clinic_id: Clinic;

    @Column({ name: 'birth_date', type: 'date' })
    birth_date: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 50 })
    phone: string;

    @Column({ type: 'int' })
    rating: number;

    @Column({ type: 'text', nullable: true })
    bio: string;

    @Column({ name: 'photo_url', type: 'varchar', length: 255, nullable: true })
    photo_url: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}