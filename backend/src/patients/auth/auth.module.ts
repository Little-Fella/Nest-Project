import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../patient.entity';
import { PatientsService } from '../patients.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    JwtModule.register({
      secret: 'your-secret-key', // Замените на настоящий секрет в production
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, PatientsService],
  exports: [AuthService],
})
export class AuthModule {}