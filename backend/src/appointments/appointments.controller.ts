import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { AppointmentsService } from './appointments.services';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @Get()
    async findAll() {
        return this.appointmentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const appointment = await this.appointmentsService.findOne(+id);
        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }
        return appointment;
    }

    @Post()
    async create(@Body() appointment: any) {
        return this.appointmentsService.create(appointment);
    }

    @Put(':id')
    schedule(
        @Param('id') id: string,
        @Body() body: { appointment_date: string; appointment_time: string }
    ) {
        return this.appointmentsService.scheduleAppointment(+id, body.appointment_date, body.appointment_time);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.appointmentsService.remove(+id);
    }
}