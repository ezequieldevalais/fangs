import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      //host: 'postgres',
      host: 'localhost',
      //port: 5432,
      port: 5433,
      password: 'fangspassword',
      username: 'fangs',
      entities: [User],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AppointmentModule]
})
export class AppModule {}
