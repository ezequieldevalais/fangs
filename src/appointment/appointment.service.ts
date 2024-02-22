import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AppointmentService {
    private appointments: Appointment[] = [
        {
            id: "1",
            patientName: "Juan Carlos",
            professionalName: "Dr. Spitteri",
            date: new Date()
        }
    ];
    private idService: IdService = new IdService()

    getAppointments(): Appointment[] {
        return this.appointments;
    }

    getAppointment(id: string): Appointment {
        return this.appointments.find((appointment) => appointment.id === id )
    }

    createAppointment(patientName: string, professionalName: string, date: Date) {
        const id : string = this.idService.generateUUID()
        this.appointments.push({
            id,
            patientName, 
            professionalName,
            date
        })
    }

    updateAppointment(id: string, patientName: string, professionalName: string, date: Date) {
        const appointment = this.getAppointment(id);
        appointment.patientName = patientName;
        appointment.professionalName = professionalName;
        appointment.date = date;
    }

    removeAppointment(id: string) {
        const index = this.appointments.findIndex((appointment) => appointment.id === id )
        if  (index > 0) {
            this.appointments.splice(index,1)

        }
    }
}

class IdService {
    generateUUID(): string {
        return uuidv4();
    }
}