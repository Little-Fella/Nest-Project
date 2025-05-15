import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateAppointmentServiceDto {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  appointment_id: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  service_id: number;
}