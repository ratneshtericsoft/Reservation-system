import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';

import { ReservationRepository } from './reservations.repository';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

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
    

  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
