import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './patient.entity';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Post()
  create(@Body() patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.patientsService.create(patient);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() patient: Partial<Patient>) {
    return this.patientsService.update(+id, patient);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.delete(+id);
  }
}