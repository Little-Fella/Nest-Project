import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Clinic } from './clinics.entity';

@Injectable()
export class ClinicsService {
    constructor(
        @InjectConnection()
        private readonly connection: Connection,
    ) {}

    async findAll(): Promise<Clinic[]> {
        const query = 'SELECT * FROM clinics';
        return await this.connection.query(query);
    }

    async findOne(id: number): Promise<Clinic> {
        const query = 'SELECT * FROM clinics WHERE id = $1';
        const result = await this.connection.query(query, [id]);
        if (result.length === 0) {
            throw new NotFoundException(`Clinic with ID ${id} not found`);
        }
        return result[0];
    }

    async create(clinic: Omit<Clinic, 'id' | 'createdAt' | 'updatedAt'>): Promise<Clinic> {
    const query = `
        INSERT INTO clinics (name, address, phone, email, work_hour_start, work_hour_end, photo_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `;
    const values = [
        clinic.name,
        clinic.address,
        clinic.phone,
        clinic.email,
        clinic.work_hour_start,
        clinic.work_hour_end,
        clinic.photo_url // Добавлено новое поле
    ];
    const result = await this.connection.query(query, values);
    return result[0];
}

async update(id: number, clinic: Partial<Clinic>): Promise<any> {
    const query = `
        UPDATE clinics
        SET 
            name = $1, 
            address = $2, 
            phone = $3, 
            email = $4, 
            work_hour_start = $5, 
            work_hour_end = $6,
            photo_url = $7
        WHERE id = $8
        RETURNING *
    `;
    const values = [
        clinic.name,
        clinic.address,
        clinic.phone,
        clinic.email,
        clinic.work_hour_start,
        clinic.work_hour_end,
        clinic.photo_url, // Добавлено новое поле
        id
    ];
    const result = await this.connection.query(query, values);
    if (result.length === 0) {
        throw new NotFoundException(`Clinic with ID ${id} not found`);
    }
    return result[0];
}

    async remove(id: number): Promise<void> {
        const query = 'DELETE FROM clinics WHERE id = $1';
        const result = await this.connection.query(query, [id]);
        if (result.rowCount === 0) {
            throw new NotFoundException(`Clinic with ID ${id} not found`);
        }
    }
}