import { Controller, Get, Param } from '@nestjs/common';

@Controller('appointment')
export class AppointmentController {
    
    @Get()
    getAppointments(): [string] {
        return ['Appointment start'];
    }

    @Get(':id')
    getAppointment(@Param('id') id: string): string {
        return `your id is ${id}`
    }
}
