import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.services';
import { Appointment } from './appointments.entity';
import { Patient } from '../patients/patient.entity';
import { Service } from '../serviecs/services.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Appointment, Patient, Service]),
    ],
    controllers: [AppointmentsController],
    providers: [AppointmentsService],
    exports: [AppointmentsService]
})
export class AppointmentsModule {}