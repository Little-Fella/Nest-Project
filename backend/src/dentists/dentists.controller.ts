import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DentistsService } from './dentists.service';
import { Dentist } from './dentist.entity';

@Controller('dentists')
export class DentistsController {
  constructor(private readonly dentistsService: DentistsService) {}

  @Get()
  findAll() {
    return this.dentistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dentistsService.findOne(+id);
  }

  @Post()
  create(@Body() dentist: Omit<Dentist, 'id'>) {
    return this.dentistsService.create(dentist);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dentist: Partial<Dentist>) {
    return this.dentistsService.update(+id, dentist);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dentistsService.delete(+id);
  }
}