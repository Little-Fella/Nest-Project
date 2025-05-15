import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './service.entity';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Service> {
    return this.servicesService.findOne(+id);
  }

  @Post()
  async create(@Body() serviceData: Omit<Service, 'id'>): Promise<Service> {
    return this.servicesService.create(serviceData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() serviceData: Partial<Service>,
  ): Promise<Service> {
    return this.servicesService.update(+id, serviceData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.servicesService.delete(+id);
  }
}