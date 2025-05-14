import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ClinicContactsService } from './clinic-contacts.service';
import { ClinicContact } from './clinic-contact.entity';

@Controller('clinic-contacts')
export class ClinicContactsController {
  constructor(private readonly clinicContactsService: ClinicContactsService) {}

  @Get()
  findAll() {
    return this.clinicContactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicContactsService.findOne(+id);
  }

  @Post()
  create(@Body() clinicContact: Omit<ClinicContact, 'id'>) {
    return this.clinicContactsService.create(clinicContact);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() clinicContact: Partial<ClinicContact>) {
    return this.clinicContactsService.update(+id, clinicContact);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicContactsService.delete(+id);
  }
}