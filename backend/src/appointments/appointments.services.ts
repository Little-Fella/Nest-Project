import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectConnection()
        private readonly connection: Connection,
    ) {}

    async findAll(): Promise<any[]> {
        const query = `
            SELECT 
                a.id,
                a.appointment_date as "appointment_date",
                a.appointment_time as "appointment_time",
                a.status,
                a.created_at as "createdAt",
                a.updated_at as "updatedAt",
                p.id as "patientId",
                p.first_name as "patient_first_name",
                p.last_name as "patient_last_name",
                s.id as "serviceId",
                s.title as "serviceTitle"
            FROM appointments a
            JOIN patients p ON a.patient_id = p.id
            JOIN services s ON a.service_id = s.id
            ORDER BY a.created_at DESC
        `;
        return await this.connection.query(query);
    }

    async findOne(id: number): Promise<any> {
        const query = `
            SELECT 
                a.*,
                p.first_name as "patient_first_name",
                p.last_name as "patient_last_name",
                s.title as "title"
            FROM appointments a
            JOIN patients p ON a.patient_id = p.id
            JOIN services s ON a.service_id = s.id
            WHERE a.id = $1
        `;
        const result = await this.connection.query(query, [id]);
        if (result.length === 0) {
            throw new NotFoundException(`Appointment with ID ${id} not found`);
        }
        return result[0];
    }

    async findByPatientId(patientId: number): Promise<any[]> {
        const query = `
        SELECT
            a.id,
            a.appointment_date as "appointment_date",
            a.appointment_time as "appointment_time",
            a.status,
            a.created_at as "createdAt",
            a.updated_at as "updatedAt",
            p.id as "patientId",
            p.first_name as "patientFirstName",
            p.last_name as "patientLastName",
            s.id as "serviceId",
            s.title as "serviceTitle"
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        JOIN services s ON a.service_id = s.id
        WHERE a.patient_id = $1
        ORDER BY a.created_at DESC
        `;
        return await this.connection.query(query, [patientId]);
    }

    async create(appointment: {
    patient_id: number;
    service_id: number;
    appointment_date: string; // или Date если вы работаете с объектами Date
    appointment_time: string;
}): Promise<any> {
    const query = `
        INSERT INTO appointments 
            (patient_id, service_id, appointment_date, appointment_time, status)
        VALUES ($1, $2, $3, $4, 'active')
        RETURNING *
    `;
    const result = await this.connection.query(query, [
        appointment.patient_id,
        appointment.service_id,
        appointment.appointment_date,
        appointment.appointment_time
    ]);
    return result[0];
}

    async scheduleAppointment(id: number, appointment_date: string, appointment_time: string): Promise<any> {
        const query = `
            UPDATE appointments
            SET 
                appointment_date = $1,
                appointment_time = $2,
                status = 'active',
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *
        `;
        const result = await this.connection.query(query, [appointment_date, appointment_time, id]);
        if (result.length === 0) {
            throw new NotFoundException(`Appointment with ID ${id} not found`);
        }
        return result[0];
    }

    async markAsCompleted(id: number): Promise<any> {
    const checkQuery = `SELECT id FROM appointments WHERE id = $1`;
    const checkResult = await this.connection.query(checkQuery, [id]);
    
    if (checkResult.length === 0) {
        return null;
    }

    const updateQuery = `
        UPDATE appointments 
        SET status = 'completed', updated_at = NOW()
        WHERE id = $1
        RETURNING *
    `;
    const result = await this.connection.query(updateQuery, [id]);
    
    return result[0];
}

    async remove(id: number): Promise<void> {
        const query = 'DELETE FROM appointments WHERE id = $1';
        const result = await this.connection.query(query, [id]);
        if (result.rowCount === 0) {
            throw new NotFoundException(`Appointment with ID ${id} not found`);
        }
    }
}