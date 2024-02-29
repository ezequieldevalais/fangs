import { Injectable, NotFoundException} from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';


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
        const appointment = this.appointments.find((appointment) => appointment.id === id )
        if(!appointment) {
            throw new NotFoundException("Resource not found");
        }
        return appointment
    }

    createAppointment({ patientName, professionalName, date } : CreateAppointmentDto) {
        const id : string = this.idService.generateUUID()
        const aDate =  new Date(date)
        this.appointments.push({
            id,
            patientName, 
            professionalName,
            date: aDate
        })
    }

    updateAppointment(id: string, {patientName, professionalName, date}: UpdateAppointmentDto) {
        const appointment = this.getAppointment(id);
        appointment.patientName = patientName;
        appointment.professionalName = professionalName;
        appointment.date =  new Date(date);
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