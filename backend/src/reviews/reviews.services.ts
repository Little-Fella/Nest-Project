import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectConnection()
        private readonly connection: Connection,
    ) {}

    async findAll(): Promise<any[]> {
        const query = `
            SELECT r.*, p.first_name, p.last_name 
            FROM reviews r
            JOIN patients p ON r.patient_id = p.id
        `;
        return await this.connection.query(query);
    }

    async findOne(id: number): Promise<any> {
        const query = `
            SELECT r.*, p.first_name, p.last_name 
            FROM reviews r
            JOIN patients p ON r.patient_id = p.id
            WHERE r.id = $1
        `;
        const result = await this.connection.query(query, [id]);
        if (result.length === 0) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }
        return result[0];
    }

    async findByGrade(grade: number): Promise<any[]> {
        const query = `
            SELECT r.*, p.first_name, p.last_name 
            FROM reviews r
            JOIN patients p ON r.patient_id = p.id
            WHERE r.grade = $1
        `;
        return await this.connection.query(query, [grade]);
    }

    async findByGradeRange(minGrade: number, maxGrade: number): Promise<any[]> {
        const query = `
            SELECT r.*, p.first_name, p.last_name 
            FROM reviews r
            JOIN patients p ON r.patient_id = p.id
            WHERE r.grade BETWEEN $1 AND $2
        `;
        return await this.connection.query(query, [minGrade, maxGrade]);
    }

    async findByPatientId(patientId: number): Promise<any[]> {
        const query = `
            SELECT r.*, p.first_name, p.last_name 
            FROM reviews r
            JOIN patients p ON r.patient_id = p.id
            WHERE r.patient_id = $1
        `;
        return await this.connection.query(query, [patientId]);
    }

    async create(review: any): Promise<any> {
        const query = `
            INSERT INTO reviews (patient_id, grade, review_content, photo_url)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [review.patient_id, review.grade, review.review_content, review.photo_url];
        return await this.connection.query(query, values);
    }

    async update(id: number, review: any): Promise<any> {
        const query = `
            UPDATE reviews
            SET patient_id = $1, grade = $2, review_content = $3, photo_url = $4
            WHERE id = $5
            RETURNING *
        `;
        const values = [review.patient_id, review.grade, review.review_content, review.photo_url, id];
        const result = await this.connection.query(query, values);
        if (result.length === 0) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }
        return result[0];
    }

    async remove(id: number): Promise<void> {
        const query = 'DELETE FROM reviews WHERE id = $1';
        const result = await this.connection.query(query, [id]);
        if (result.rowCount === 0) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }
    }
}