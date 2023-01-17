import { IsNotEmpty } from 'class-validator';

export class UserSubscribeDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
  
  /*@IsNotEmpty()
  ticketOfficeNumber: number;*/
}