import { Injectable, NotFoundException } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { v4 as uuidv4 } from 'uuid';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  private idService: IdService = new IdService();

  async getAppointments(): Promise<Appointment[]> {
    return await this.appointmentRepository.find();
  }

  async getAppointment(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException('Resource not found');
    }
    return appointment;
  }

  async createAppointment({
    patientName,
    professionalName,
    date,
  }: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentRepository.create({
      patientName: patientName,
      professionalName,
      date: new Date(date),
    });
    return this.appointmentRepository.save(appointment);
  }

  async updateAppointment(
    id: string,
    { patientName, professionalName, date }: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = this.appointmentRepository.preload({
      id,
      patientName,
      professionalName,
      date: new Date(date),
    });

    if (!appointment) {
      throw new NotFoundException('Resource not found');
    }

    return appointment;
  }

  async removeAppointment(id: string): Promise<void> {
    const appointment = await this.appointmentRepository.findOneBy({ id });

    if (!appointment) {
      throw new NotFoundException('Resource not found');
    }

    this.appointmentRepository.remove(appointment);
  }
}

class IdService {
  generateUUID(): string {
    return uuidv4();
  }
}
