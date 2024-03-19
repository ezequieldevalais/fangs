import { IsString, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  patientName: string;

  @IsString()
  professionalName: string;

  @IsDateString()
  date: string;
}
