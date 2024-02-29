import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentController } from './appointment.controller';
import { CreateAppointmentDto } from './dto';
import { Validator } from 'class-validator';

describe('AppointmentController', () => {
  let controller: AppointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should validate Create Appointment DTO', () => {
    let validator = new Validator()

    const appointment : CreateAppointmentDto = {
      "date" : "2024-02-22",
      "patientName" : 'Ezequiel',
      "professionalName" : 'Clara'
    }
    validator.validate(appointment)
    expect(controller).toBeDefined();
  });
});
