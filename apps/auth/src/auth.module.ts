import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt'
import * as Joi from 'joi';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@app/common';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
      UsersModule,
      LoggerModule,
      ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: Joi.object({
          MONGODB_URI : Joi.string().required(),
          DB_NAME : Joi.string().required(),
          JWT_SECRET: Joi.string().required(),
          JWT_EXPIRATION: Joi.string().required(),
          PORT : Joi.number().required()
          
        }),
      }),
  
     JwtModule.registerAsync({
      useFactory : (configService : ConfigService)=>({
      secret : configService.get<string>('JWT_SECRET'),
      signOptions : {
        expiresIn : `${configService.get<number>('JWT_EXPIRATION')}s`
      }}),
      inject : [ConfigService]
    }),

],
  
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
