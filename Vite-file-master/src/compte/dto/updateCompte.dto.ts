import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength, ValidationArguments } from 'class-validator';

export class UpdateCompteDto {
  @IsString()
  @IsOptional()
  @MinLength(3,{
    message: (validationData: ValidationArguments) => {
      return `The size of your ${validationData.property} ${validationData.value} is short, the minimum size of ${validationData.property} is ${validationData.constraints[0]}`
    }
    })
  @MaxLength(20, { 
    message: (validationData: ValidationArguments) => {
      return `The size of your ${validationData.property} ${validationData.value} is long, the maximum size of ${validationData.property} is ${validationData.constraints[0]}`
    }
    })
  firstname: string;

  @IsString()
  @IsOptional()
  @MinLength(3,{
    message: (validationData: ValidationArguments) => {
      return `The size of your ${validationData.property} ${validationData.value} is short, the minimum size of ${validationData.property} is ${validationData.constraints[0]}`
    }
    })
  @MaxLength(20, { 
    message: (validationData: ValidationArguments) => {
      return `The size of your ${validationData.property} ${validationData.value} is long, the maximum size of ${validationData.property} is ${validationData.constraints[0]}`
    }
    })
  lastname: string;

  @IsString()
  @IsOptional()
  cin: string;

  @IsNumber()
  @IsOptional()
  phoneNumber: number;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  compagny: string;

  @IsString()
  @IsOptional()
  taxIdentificationNumber: string; 
}