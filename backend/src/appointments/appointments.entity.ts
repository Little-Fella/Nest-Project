import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { Service } from '../serviecs/services.entity';

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @ManyToOne(() => Service)
    @JoinColumn({ name: 'service_id' })
    service: Service;

    @Column({ type: 'date', nullable: true })
    appointment_date: Date;

    @Column({ type: 'varchar', length: 50, nullable: true })
    appointment_time: string;

    @Column({ type: 'varchar', length: 50 })
    status: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ 
        name: 'updated_at', 
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP', 
        onUpdate: 'CURRENT_TIMESTAMP' 
    })
    updatedAt: Date;
}