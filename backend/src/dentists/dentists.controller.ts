import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Query } from '@nestjs/common';
import { DentistsService } from './dentists.services';
import { Dentist } from './dentists.entity';

@Controller('dentists')
export class DentistsController {
    constructor(private readonly dentistsService: DentistsService) {}

    @Get()
    findAll() {
        return this.dentistsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const dentist = await this.dentistsService.findOne(+id);
        if (!dentist) {
            throw new NotFoundException('Dentist not found');
        }
        return dentist;
    }

    @Get('specialization/:specialization')
    findBySpecialization(@Param('specialization') specialization: string) {
        return this.dentistsService.findBySpecialization(specialization);
    }

    @Get('clinic/:clinic_id')
    findByClinicId(@Param('clinic_id') clinicId: string) {
        return this.dentistsService.findByClinicId(+clinicId);
    }

    @Get('clinic/:clinic_id/specialization/:specialization')
        findByClinicAndSpecialization(
        @Param('clinic_id') clinicId: string,
        @Param('specialization') specialization: string
        ) {
            return this.dentistsService.findByClinicAndSpecialization(+clinicId, specialization);
    }

    @Post()
    create(@Body() dentist: Omit<Dentist, 'id' | 'createdAt' | 'updatedAt'>) {
        return this.dentistsService.create(dentist);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dentist: any) {
        return this.dentistsService.update(+id, dentist);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.dentistsService.remove(+id);
    }
}