// clinics.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsController } from './clinicss.controller';
import { ClinicsService } from './clinics.services';
import { Clinic } from './clinics.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Clinic])],
    controllers: [ClinicsController],
    providers: [ClinicsService],
})
export class ClinicsModule {}