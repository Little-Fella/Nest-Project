import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ServicesService } from '../services.services';

@Controller('services/date')
export class ServiceDatesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Get(':serviceId')
    getDates(@Param('serviceId') serviceId: string) {
        return this.servicesService.findDatesByServiceId(+serviceId);
    }

    @Post(':serviceId')
    addDate(
        @Param('serviceId') serviceId: string,
        @Body() body: { date: string; time: string }
    ) {
        return this.servicesService.addServiceDate(+serviceId, body.date, body.time);
    }

    @Delete(':dateId')
    removeDate(@Param('dateId') dateId: string) {
        return this.servicesService.removeServiceDate(+dateId);
    }
}