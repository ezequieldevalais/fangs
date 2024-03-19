import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { Appointment } from './modules/appointment/appointment.entity';
import { PetController } from './modules/pet/pet.controller';
import { PetService } from './modules/pet/pet.service';

/*@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      //host: 'postgres',
      host: 'localhost',
      //port: 5432,
      port: 5433,
      password: 'fangspassword',
      username: 'fangs',
      entities: [User, Appointment],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AppointmentModule,
  ],
})*/

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      //host: 'postgres',
      host: '34.176.136.144',
      //port: 5432,
      port: 5432,
      password: 'Bsg%U8Zu0Fx5lHkE',
      username: 'postgres',
      entities: [User, Appointment],
      database: 'fangsdb',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AppointmentModule,
    ConfigModule.forRoot(),
  ],
  controllers: [PetController],
  providers: [PetService],
})
export class AppModule {}
