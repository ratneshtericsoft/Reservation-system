import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
// import { CreateChargeDto } from '@app/common';

export class CreateReservationDto {
  @IsDefined()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;


  @IsDefined()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endDate: Date;

//   @IsDefined()
//   @IsNotEmptyObject()
//   @ValidateNested()
//   @Type(() => CreateChargeDto)
//   charge: CreateChargeDto;
}