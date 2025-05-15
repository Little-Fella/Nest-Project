import { Controller, Post, Get, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AppointmentServicesService } from './appointment-service.service';
import { CreateAppointmentServiceDto } from '../dto/create-appointment-service.dto';
import { AppointmentServiceResponseDto } from '../dto/appointment-service-response.dto';

@Controller('appointment-services')
export class AppointmentServicesController {
  constructor(
    private readonly appointmentServicesService: AppointmentServicesService,
  ) {}

  @Post()
  async create(
    @Body() createDto: CreateAppointmentServiceDto,
  ): Promise<AppointmentServiceResponseDto> {
    return this.appointmentServicesService.create(createDto);
  }

  @Get('appointment/:appointmentId')
  async findByAppointmentId(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
  ): Promise<AppointmentServiceResponseDto[]> {
    return this.appointmentServicesService.findByAppointmentId(appointmentId);
  }

  @Get('service/:serviceId')
  async findByServiceId(
    @Param('serviceId', ParseIntPipe) serviceId: number,
  ): Promise<AppointmentServiceResponseDto[]> {
    return this.appointmentServicesService.findByServiceId(serviceId);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.appointmentServicesService.remove(id);
  }

  @Delete('appointment/:appointmentId/service/:serviceId')
  async removeByAppointmentAndService(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @Param('serviceId', ParseIntPipe) serviceId: number,
  ): Promise<void> {
    return this.appointmentServicesService.removeByAppointmentAndService(
      appointmentId,
      serviceId,
    );
  }
}