import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicContact } from './clinic-contact.entity';
import { ClinicContactsService } from './clinic-contacts.service';
import { ClinicContactsController } from './clinic-contacts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicContact])],
  providers: [ClinicContactsService],
  controllers: [ClinicContactsController],
})
export class ClinicContactsModule {}