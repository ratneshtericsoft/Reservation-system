import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { ConfigService } from '@nestjs/config';
import { LoggerModule } from '@app/common';

@Module({
  imports: [UsersModule,
      LoggerModule,
     JwtModule.registerAsync({
      useFactory : (configService : ConfigService)=>({
      secret : configService.get<string>('JWT_SECRET'),
      signOptions : {
        expiresIn : `${configService.get<number>('JWT_EXPIRATION')}s`
      }
    })
  }),

],
  
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}