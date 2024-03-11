import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from '../appointment/appointment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { Repository } from 'typeorm';

describe('AppointmentsService', () => {
  let service: AppointmentService;
  let appointmentRepository: Repository<Appointment>;
  
  const APPOINTMENT_REPOSITORY_TOKEN = getRepositoryToken(Appointment);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentService,
      {
        provide: APPOINTMENT_REPOSITORY_TOKEN,
        useValue: {
          create: jest.fn(),
          findOneBy: jest.fn(),
          find: jest.fn(),
          save: jest.fn(),
          preload: jest.fn(),
          remove: jest.fn()
        }
      }]
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
    appointmentRepository = module.get<Repository<Appointment>>(APPOINTMENT_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('apppointmentRepository should be defined', () => {
    expect(appointmentRepository).toBeDefined();
  });

  it('create a new appointment', async () => {
    let date = new Date()
    let appointmentCreate = { 
      patientName: 'asd',
      professionalName: 'asd',
      date: date
    }
    let result = { ...appointmentCreate, id: "1"}

    jest.spyOn(appointmentRepository, 'create').mockReturnValue(result)

    await service.createAppointment(
      {patientName: 'asd', professionalName: 'asd', date: '2023-04-02'}
    )
    expect(appointmentRepository.save).toHaveBeenCalledWith(result)
  })

});
