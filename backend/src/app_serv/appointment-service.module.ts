import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentServicesService } from './appointment-service.service';
import { AppointmentServicesController } from './appointment-service.controller';
import { AppointmentService } from './appointment-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentService])],
  providers: [AppointmentServicesService],
  controllers: [AppointmentServicesController],
})
export class AppointmentServicesModule {}