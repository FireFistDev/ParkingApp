import { IsOptional, IsString, IsEnum, IsNumber } from "class-validator";
import { CarsType } from "@prisma/client";

export class CreateCarDto {
  @IsString({ message: "Car name must be a string" })
  carName: string;

  @IsEnum(CarsType, { message: "Invalid car type" })
  type: CarsType;

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
  @IsEnum(CarsType, { message: "Invalid car type" })
  type?: CarsType;

  @IsOptional()
  @IsString({ message: "Serial number must be a string" })
  serialNumber?: string;
}
