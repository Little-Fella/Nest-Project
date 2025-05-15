import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ClinicContactsModule } from './clinic-contacts/clinic-contacts.module';
import { PatientsModule } from './patients/patients.module';
import { DentistsModule } from './dentists/dentists.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ServicesModule } from './services/services.module';
import { AppointmentServicesModule } from './app_serv/appointment-service.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    ClinicContactsModule,
    PatientsModule,
    DentistsModule,
    AppointmentsModule,
    PaymentsModule,
    ReviewsModule,
    ServicesModule,
    AppointmentServicesModule,
  ],
})
export class AppModule {}