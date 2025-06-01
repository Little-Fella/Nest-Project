import { Controller, Get, Post, Body, Param, Put, Delete, UnauthorizedException } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './patient.entity';
import { AuthService } from './auth/auth.service'; // Этот сервис нужно создать

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    const patient = await this.patientsService.findByEmail(email);
    if (!patient) {
      return { message: 'Patient not found' };
    }
    return patient;
  }

  @Post()
  async create(@Body() patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.patientsService.create(patient);
  }

  @Post('login')
    async login(@Body() credentials: { email: string; password: string }) {
    const user = await this.authService.validateUser(credentials.email, credentials.password);
    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }
      return this.authService.login(user);
    }

  @Put(':id')
  update(@Param('id') id: string, @Body() patient: Partial<Patient>) {
    return this.patientsService.update(+id, patient);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.delete(+id);
  }
}