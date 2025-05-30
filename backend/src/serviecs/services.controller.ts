import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Query } from '@nestjs/common';
import { ServicesService } from './services.services';
import { Service } from './services.entity';

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Get()
    findAll() {
        return this.servicesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const service = await this.servicesService.findOne(+id);
        if (!service) {
            throw new NotFoundException('Service not found');
        }
        return service;
    }

    @Get('dentist/:dentistId')
    findByDentistId(@Param('dentistId') dentistId: string) {
    return this.servicesService.findByDentistId(+dentistId);
    }

    @Get('title/:title')
    findByTitle(@Param('title') title: string) {
        return this.servicesService.findByTitle(title);
    }

    @Get('price/:min/:max')
    findByPriceRange(
        @Param('min') minPrice: string,
        @Param('max') maxPrice: string,
    ) {
        return this.servicesService.findByPriceRange(+minPrice, +maxPrice);
    }

    @Post()
    create(@Body() service: Omit<Service, 'id' | 'createdAt'>) {
        return this.servicesService.create(service);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() service: Partial<Service>) {
        return this.servicesService.update(+id, service);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.servicesService.remove(+id);
    }
}