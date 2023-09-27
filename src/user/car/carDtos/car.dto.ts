import { IsOptional, IsString, IsEnum, IsNumber } from "class-validator";
import { CarTypes } from "@prisma/client";

export class CreateCarDto {
  @IsString({ message: "Car name must be a string" })
  carName: string;

  @IsEnum(CarTypes, { message: "Invalid car type" })
  type: CarTypes;

  @IsString({ message: "Serial number must be a string" })
  serialNumber: string;
}

export class UpdateCarDto {
  @IsNumber({}, { message: "id must be number" })
  id: number;
  @IsOptional()
  @IsString({ message: "Car name must be a string" })
  carName?: string;

  @IsOptional()
  @IsEnum(CarTypes, { message: "Invalid car type" })
  type?: CarTypes;

  @IsOptional()
  @IsString({ message: "Serial number must be a string" })
  serialNumber?: string;
}
