export class AppointmentServiceResponseDto {
  id: number;
  appointmentId: number;
  serviceId: number;

  constructor(appointmentService: any) {
    this.id = appointmentService.id;
    this.appointmentId = appointmentService.appointment_id;
    this.serviceId = appointmentService.service_id;
  }
}