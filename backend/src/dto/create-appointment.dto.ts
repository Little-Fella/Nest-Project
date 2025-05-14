export class CreateAppointmentDto {
  patient_id: number;
  dentist_id: number;
  appointment_date: Date;
  appointment_time: string;
  reason: string;
  status?: string;
}