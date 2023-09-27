import { PartialType } from '@nestjs/mapped-types';
import { CreateParkingZoneDto } from './create-parking-zone.dto';
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional } from 'class-validator';
export class UpdateParkingZoneDto extends PartialType(CreateParkingZoneDto) {
    @IsOptional()
    @IsString({ message: 'Zone name must be a string' })
    zoneName?: string;
    @IsOptional()
    @IsString({ message: 'Zone address must be a string' })
    zoneAddress?: string;
    @IsOptional()
    @IsNumber({}, { message: 'Price per hour must be a number' })
    @IsPositive({ message: 'Price per hour must be a positive number' })
    pricePerHour?: number;
  }
  

