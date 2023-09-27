import { IsString, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateParkingZoneDto {
    @IsString({ message: 'Zone name must be a string' })
    @IsNotEmpty({ message: 'Zone name is required' })
    zoneName: string;
    @IsString({ message: 'Zone name must be a string' })
    @IsNotEmpty({ message: 'Zone name is required' })
    creator: string;
    @IsString({ message: 'Zone address must be a string' })
    @IsNotEmpty({ message: 'Zone address is required' })
    zoneAddress: string;
    @IsNumber({}, { message: 'Price per hour must be a number' })
    @IsPositive({ message: 'Price per hour must be a positive number' })
    pricePerHour: number;
}
