import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicContact } from './clinic-contact.entity';

@Injectable()
export class ClinicContactsService {
  constructor(
    @InjectRepository(ClinicContact)
    private clinicContactsRepository: Repository<ClinicContact>,
  ) {}

  async findAll(): Promise<ClinicContact[]> {
    return this.clinicContactsRepository.query('SELECT * FROM clinic_contacts');
  }

  async findOne(id: number): Promise<ClinicContact> {
    const result = await this.clinicContactsRepository.query(
      'SELECT * FROM clinic_contacts WHERE id = $1', 
      [id]
    );
    return result[0];
  }

  async create(clinicContact: Partial<ClinicContact>): Promise<ClinicContact> {
    const result = await this.clinicContactsRepository.query(
      `INSERT INTO clinic_contacts 
       (clinic_name, phone, email, address, working_hours, map_url) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [
        clinicContact.clinic_name,
        clinicContact.phone,
        clinicContact.email,
        clinicContact.address,
        clinicContact.working_hours,
        clinicContact.map_url,
      ],
    );
    return result[0];
  }

  async update(id: number, clinicContact: Partial<ClinicContact>): Promise<ClinicContact> {
    const result = await this.clinicContactsRepository.query(
      `UPDATE clinic_contacts 
       SET clinic_name = $1, phone = $2, email = $3, 
           address = $4, working_hours = $5, map_url = $6 
       WHERE id = $7 
       RETURNING *`,
      [
        clinicContact.clinic_name,
        clinicContact.phone,
        clinicContact.email,
        clinicContact.address,
        clinicContact.working_hours,
        clinicContact.map_url,
        id,
      ],
    );
    return result[0];
  }

  async delete(id: number): Promise<void> {
    await this.clinicContactsRepository.query(
      'DELETE FROM clinic_contacts WHERE id = $1', 
      [id]
    );
  }
}