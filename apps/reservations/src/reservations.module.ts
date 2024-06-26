import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';

import { ReservationRepository } from './reservations.repository';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      validationSchema : Joi.object({
        MONGODB_URI : Joi.string().required(),
        DB_NAME : Joi.string().required(),
        PORT : Joi.number().required()
      })
    }),
    DatabaseModule,
    DatabaseModule.forFeature([{
      name : ReservationDocument.name, schema: ReservationSchema
    }]),
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name : AUTH_SERVICE,
        useFactory: (configService: ConfigService)=>({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
