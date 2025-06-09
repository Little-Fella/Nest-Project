import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Dentist } from './dentists.entity';

@Injectable()
export class DentistsService {
    constructor(
        @InjectConnection()
        private readonly connection: Connection,
    ) {}

    async findAll(): Promise<Dentist[]> {
    const query = `
        SELECT
            d.id,
            d.first_name as "first_name",
            d.last_name as "last_name",
            d.specialization,
            d.clinic_id as "clinic_id",
            c.name as "clinicName",
            c.address as "clinicAddress",
            d.birth_date as "birth_date",
            d.email,
            d.phone,
            d.rating,
            d.bio,
            d.photo_url as "photo_url",
            d.created_at as "createdAt",
            d.updated_at as "updatedAt"
        FROM dentists d
        LEFT JOIN clinics c ON d.clinic_id = c.id
    `;
    return await this.connection.query(query);
}

async findOne(id: number): Promise<Dentist> {
    const query = `
        SELECT
            d.id,
            d.first_name as "first_name",
            d.last_name as "last_name",
            d.specialization,
            d.clinic_id as "clinic_id",
            c.name as "clinicName",
            c.address as "clinicAddress",
            d.birth_date as "birth_date",
            d.email,
            d.phone,
            d.rating,
            d.bio,
            d.photo_url as "photo_url",
            d.created_at as "createdAt",
            d.updated_at as "updatedAt"
        FROM dentists d
        LEFT JOIN clinics c ON d.clinic_id = c.id
        WHERE d.id = $1
    `;
    const result = await this.connection.query(query, [id]);
    if (result.length === 0) {
        throw new NotFoundException(`Dentist with ID ${id} not found`);
    }
    return result[0];
}

async findBySpecialization(specialization: string): Promise<Dentist[]> {
    const query = `
        SELECT
            d.id,
            d.first_name as "first_name",
            d.last_name as "last_name",
            d.specialization,
            d.clinic_id as "clinic_id",
            c.name as "clinicName",
            c.address as "clinicAddress",
            d.birth_date as "birth_date",
            d.email,
            d.phone,
            d.rating,
            d.bio,
            d.photo_url as "photo_url",
            d.created_at as "createdAt",
            d.updated_at as "updatedAt"
        FROM dentists d
        LEFT JOIN clinics c ON d.clinic_id = c.id
        WHERE d.specialization = $1
    `;
    return await this.connection.query(query, [specialization]);
}

async findByClinicId(clinicId: number): Promise<Dentist[]> {
    const query = `
        SELECT
            d.id,
            d.first_name as "first_name",
            d.last_name as "last_name",
            d.specialization,
            d.clinic_id as "clinic_id",
            c.name as "clinicName",
            c.address as "clinicAddress",
            d.birth_date as "birth_date",
            d.email,
            d.phone,
            d.rating,
            d.bio,
            d.photo_url as "photo_url",
            d.created_at as "createdAt",
            d.updated_at as "updatedAt"
        FROM dentists d
        LEFT JOIN clinics c ON d.clinic_id = c.id
        WHERE d.clinic_id = $1
    `;
    return await this.connection.query(query, [clinicId]);
}

async findByClinicAndSpecialization(clinicId: number, specialization: string): Promise<Dentist[]> {
    const query = `
        SELECT
            d.id,
            d.first_name as "first_name",
            d.last_name as "last_name",
            d.specialization,
            d.clinic_id as "clinic_id",
            c.name as "clinicName",
            c.address as "clinicAddress",
            d.birth_date as "birth_date",
            d.email,
            d.phone,
            d.rating,
            d.bio,
            d.photo_url as "photo_url",
            d.created_at as "createdAt",
            d.updated_at as "updatedAt"
        FROM dentists d
        LEFT JOIN clinics c ON d.clinic_id = c.id
        WHERE d.clinic_id = $1 AND d.specialization = $2
    `;
    return await this.connection.query(query, [clinicId, specialization]);
}

    async create(dentist: Omit<Dentist, 'id' | 'createdAt' | 'updatedAt'>): Promise<Dentist> {
        const query = `
            INSERT INTO dentists 
            (first_name, last_name, specialization, clinic_id, birth_date, email, phone, rating, bio, photo_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;
        const values = [
            dentist.first_name,
            dentist.last_name,
            dentist.specialization,
            dentist.clinic_id,
            dentist.birth_date,
            dentist.email,
            dentist.phone,
            dentist.rating,
            dentist.bio,
            dentist.photo_url
        ];
        const result = await this.connection.query(query, values);
        return result[0];
    }

    async update(id: number, dentist: any): Promise<Dentist> {
        const query = `
            UPDATE dentists
            SET 
                first_name = $1,
                last_name = $2,
                specialization = $3,
                clinic_id = $4,
                birth_date = $5,
                email = $6,
                phone = $7,
                rating = $8,
                bio = $9,
                photo_url = $10
            WHERE id = $11
            RETURNING *
        `;
        const values = [
            dentist.first_name || dentist.firstName,
            dentist.last_name || dentist.lastName,
            dentist.specialization,
            dentist.clinic_id || (dentist.clinic ? dentist.clinic.id : null),
            dentist.birth_date || dentist.birthDate,
            dentist.email,
            dentist.phone,
            dentist.rating,
            dentist.bio,
            dentist.photo_url || dentist.photoUrl,
            id
        ];
        const result = await this.connection.query(query, values);
        if (result.length === 0) {
            throw new NotFoundException(`Dentist with ID ${id} not found`);
        }
        return result[0];
    }

    async remove(id: number): Promise<void> {
        const query = 'DELETE FROM dentists WHERE id = $1';
        const result = await this.connection.query(query, [id]);
        if (result.rowCount === 0) {
            throw new NotFoundException(`Dentist with ID ${id} not found`);
        }
    }
}