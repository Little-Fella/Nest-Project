export class CreatePaymentDto {
  appointment_id: number;
  amount: number;
  payment_method: string;
  payment_date?: Date;
  status?: string;
}