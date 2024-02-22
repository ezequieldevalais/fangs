import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}
    
    @Get()
    getAppointments(): Appointment[] {
        return this.appointmentService.getAppointments()
    }

    @Get(':id')
    getAppointment(@Param('id') id: string): Appointment {
        return this.appointmentService.getAppointment(id)
    
    }

    @Post()
    createAppointment(@Body() createDto: CreateAppointmentDto) {
        return this.appointmentService.createAppointment(
            createDto.patientName,
            createDto.professionalName,
            createDto.date
        )
    }

    @Patch(':id')
    updateAppointment(@Param('id') id: string, @Body() updateDto: UpdateAppointmentDto) {
        return this.appointmentService.updateAppointment(
            id,
            updateDto.patientName,
            updateDto.professionalName,
            updateDto.date
        )
    }

    @Delete(':id')
    deleteAppointment(@Param('id') id: string) { 
        return this.appointmentService.removeAppointment(id)
    }
}
