import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DentistsController } from "./dentists.controller"
import { DentistsService } from "./dentists.services"
import { Dentist } from "./dentists.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Dentist])],
    controllers: [DentistsController],
    providers: [DentistsService],
})
export class DentistsModule {}