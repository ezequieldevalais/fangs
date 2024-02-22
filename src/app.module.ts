import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AppointmentController } from './appointment/appointment.controller';
import { AppointmentService } from './appointment/appointment.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      password: 'fangspassword',
      username: 'fangs',
      entities: [User],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    UserModule],
  controllers: [AppController, AppointmentController],
  providers: [AppService, AppointmentService],
})
export class AppModule {}
