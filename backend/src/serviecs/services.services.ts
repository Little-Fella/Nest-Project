import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Service } from './services.entity';

@Injectable()
export class ServicesService {
    constructor(
        @InjectConnection()
        private readonly connection: Connection,
    ) {}

    async findAll(): Promise<any[]> {
        const query = `
            SELECT 
                s.id,
                s.title,
                s.text,
                s.price,
                s.photo_url as "photo_url",
                s.created_at as "createdAt",
                d.id as "dentistId",
                d.first_name as "dentistFirstName",
                d.last_name as "dentistLastName"
            FROM services s
            LEFT JOIN dentists d ON s.dentist_id = d.id
        `;
        return await this.connection.query(query);
    }

    async findOne(id: number): Promise<any> {
        const query = `
            SELECT 
                s.id,
                s.title,
                s.text,
                s.price,
                s.photo_url as "photo_url",
                s.created_at as "createdAt",
                d.id as "dentistId",
                d.first_name as "dentistFirstName",
                d.last_name as "dentistLastName"
            FROM services s
            LEFT JOIN dentists d ON s.dentist_id = d.id
            WHERE s.id = $1
        `;
        const result = await this.connection.query(query, [id]);
        if (result.length === 0) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }
        return result[0];
    }

    async findByDentistId(dentistId: number): Promise<any[]> {
    const query = `
        SELECT 
            s.id,
            s.title,
            s.text,
            s.price,
            s.photo_url as "photo_url",
            s.created_at as "createdAt",
            d.id as "dentistId",
            d.first_name as "dentistFirstName",
            d.last_name as "dentistLastName"
        FROM services s
        LEFT JOIN dentists d ON s.dentist_id = d.id
        WHERE s.dentist_id = $1
    `;
    return await this.connection.query(query, [dentistId]);
}

    async findByTitle(title: string): Promise<any[]> {
        const query = `
            SELECT 
                s.id,
                s.title,
                s.text,
                s.price,
                s.photo_url as "photo_url",
                s.created_at as "createdAt",
                d.id as "dentistId",
                d.first_name as "dentistFirstName",
                d.last_name as "dentistLastName"
            FROM services s
            LEFT JOIN dentists d ON s.dentist_id = d.id
            WHERE s.title ILIKE $1
        `;
        return await this.connection.query(query, [title]);
    }

    async findByPriceRange(minPrice: number, maxPrice: number): Promise<any[]> {
        const query = `
            SELECT 
                s.id,
                s.title,
                s.text,
                s.price,
                s.photo_url as "photo_url",
                s.created_at as "createdAt",
                d.id as "dentistId",
                d.first_name as "dentistFirstName",
                d.last_name as "dentistLastName"
            FROM services s
            LEFT JOIN dentists d ON s.dentist_id = d.id
            WHERE s.price BETWEEN $1 AND $2
        `;
        return await this.connection.query(query, [minPrice, maxPrice]);
    }

    // Методы для добавления дат

    async findDatesByServiceId(serviceId: number): Promise<any[]> {
    const query = `
        SELECT 
            sd.id,
            sd.service_date as "serviceDate",
            sd.service_time as "serviceTime",
            s.title as "serviceTitle"
        FROM service_dates sd
        JOIN services s ON sd.service_id = s.id
        WHERE sd.service_id = $1
        ORDER BY sd.service_date, sd.service_time
    `;
        return await this.connection.query(query, [serviceId]);
    }

    async addServiceDate(serviceId: number, date: string, time: string): Promise<any> {
        const query = `
            INSERT INTO service_dates (service_id, service_date, service_time)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        return await this.connection.query(query, [serviceId, date, time]);
    }

    async removeServiceDate(dateId: number): Promise<void> {
        const query = 'DELETE FROM service_dates WHERE id = $1';
        const result = await this.connection.query(query, [dateId]);
        if (result.rowCount === 0) {
            throw new NotFoundException(`Service date with ID ${dateId} not found`);
        }
    }

    async create(service: Omit<Service, 'id' | 'createdAt'>): Promise<Service> {
        const query = `
            INSERT INTO services (dentist_id, title, text, price, photo_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const result = await this.connection.query(query, [
            service.dentist_id,
            service.title,
            service.text,
            service.price,
            service.photoUrl
        ]);
        return result[0];
    }

    async update(id: number, service: any): Promise<Service> {
    const query = `
        UPDATE services
        SET
            title = $1,
            text = $2,
            price = $3,
            photo_url = $4
        WHERE id = $5
        RETURNING *
    `;

    const values = [
        service.title,
        service.text,
        service.price,
        service.photo_url || service.photoUrl, // поддержка обоих вариантов названия поля
        id
    ];

    const result = await this.connection.query(query, values);
    if (result.length === 0) {
        throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return result[0];
}

    async remove(id: number): Promise<void> {
        const query = 'DELETE FROM services WHERE id = $1';
        const result = await this.connection.query(query, [id]);
        if (result.rowCount === 0) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }
    }
}