// clinics.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Query } from '@nestjs/common';
import { ClinicsService } from './clinics.services';
import { Clinic } from './clinics.entity';

@Controller('clinics')
export class ClinicsController {
    constructor(private readonly clinicsService: ClinicsService) {}

    @Get()
    findAll() {
        return this.clinicsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const clinic = await this.clinicsService.findOne(+id);
        if (!clinic) {
            throw new NotFoundException('Clinic not found');
        }
        return clinic;
    }

    @Post()
    create(@Body() clinic: Omit<Clinic, 'id' | 'createdAt' | 'updatedAt'>) {
        return this.clinicsService.create(clinic);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() clinic: Partial<Clinic>) {
        return this.clinicsService.update(+id, clinic);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clinicsService.remove(+id);
    }
}