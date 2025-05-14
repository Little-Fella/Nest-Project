import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("clinic_contacts")
export class ClinicContact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    clinic_name: string;

    @Column({ type: 'varchar', length: 50 })
    phone: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'text' })
    address: string;

    @Column({ type: 'varchar', length: 255, name: 'working_hours' })
    working_hours: string;

    @Column({ type: 'text', name: 'map_url' })
    map_url: string;
}