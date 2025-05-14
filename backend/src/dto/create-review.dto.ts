export class CreateReviewDto {
  patient_id: number;
  dentist_id: number;
  rating: number;
  comment?: string;
}