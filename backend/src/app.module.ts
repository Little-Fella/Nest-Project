import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { PatientsModule } from './patients/patients.module';
import { ReviewsModule } from './reviews/reviews.module'
import { ClinicsModule } from './clinics/clinics.module';
import { DentistsModule } from './dentists/dentists.module';
import { ServicesModule } from './serviecs/services.module';
import { AppointmentsModule } from './appointments/appointments.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    PatientsModule,
    ReviewsModule,
    ClinicsModule,
    DentistsModule,
    ServicesModule,
    AppointmentsModule
  ],
})
export class AppModule {}