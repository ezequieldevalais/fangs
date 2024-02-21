import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AppointmentController } from './appointment/appointment.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.19.0.2',
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
  providers: [AppService],
})
export class AppModule {}
