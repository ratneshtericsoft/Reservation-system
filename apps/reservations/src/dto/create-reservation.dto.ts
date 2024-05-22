import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
// import { CreateChargeDto } from '@app/common';

export class CreateReservationDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsDate()
  @Type(() => Date)
  startDate: Date;


  @IsDefined()
  @IsNotEmptyObject()
  @IsDate()
  @Type(() => Date)
  endDate: Date;

//   @IsDefined()
//   @IsNotEmptyObject()
//   @ValidateNested()
//   @Type(() => CreateChargeDto)
//   charge: CreateChargeDto;
}