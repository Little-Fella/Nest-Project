import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from './services.controller';
import { ServiceDatesController } from './service-date/service.date.controller';
import { ServicesService } from './services.services';
import { Service } from './services.entity';
import { ServiceDate } from './service-date/service.date.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Service, ServiceDate])],
    controllers: [ServicesController, ServiceDatesController],
    providers: [ServicesService],
})
export class ServicesModule {}