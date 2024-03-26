import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { Appointment } from './modules/appointment/appointment.entity';
import { PetController } from './modules/pet/pet.controller';
import { PetService } from './modules/pet/pet.service';
import { AuthModule } from './auth/auth.module';
import { ACGuard, AccessControlModule } from 'nest-access-control';
import { RBAC_POLICY } from './auth/rbac-policy';
import { APP_GUARD } from '@nestjs/core';
import { SessionGuard } from './auth/guards/session.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      password: process.env.DB_PASSWORD || 'password',
      username: process.env.DB_USER || 'postgres',
      database: process.env.DB_NAME || 'postgres',
      entities: [User, Appointment],
      synchronize: true,
      logging: true,
    }),
    AccessControlModule.forRoles(RBAC_POLICY),
    AuthModule,
    UserModule,
    AppointmentModule,
  ],
  controllers: [PetController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SessionGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ACGuard,
    },
    PetService,
  ],
})
export class AppModule {}
