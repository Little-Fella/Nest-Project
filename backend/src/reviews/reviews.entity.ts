import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../patients/patient.entity';

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @Column({ name: 'patient_id' })
    patient_id: number;

    @Column({ type: 'int' })
    grade: number; // Значение от 0 до 5

    @Column({ name: 'review_content', type: 'text' })
    review_content: string;

    @Column({ name: 'photo_url', type: 'varchar', length: 255, nullable: true })
    photo_url: string | null; // Не знаю как добавлять url фото, но пусть будет

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}