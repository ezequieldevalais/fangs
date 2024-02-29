import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';

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
        return this.appointmentService.createAppointment(createDto)
    }

    @Patch(':id')
    updateAppointment(@Param('id') id: string, @Body() updateDto: UpdateAppointmentDto) {
        return this.appointmentService.updateAppointment(
            id,
            updateDto
        )
    }

    @Delete(':id')
    deleteAppointment(@Param('id') id: string) { 
        return this.appointmentService.removeAppointment(id)
    }
}
