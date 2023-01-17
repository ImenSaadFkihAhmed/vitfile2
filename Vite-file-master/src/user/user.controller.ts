import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginCredentialsDto } from './dto/loginCredentials.dto';
import { UserEntity } from './entity/user.entity';
import { UserSubscribeDto } from './dto/userSubscribe.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  register(@Body() userSubscribeDto: UserSubscribeDto) {
    return this.userService.register(userSubscribeDto);
  }
  
  @Post('login')
  login(@Body() credentials: LoginCredentialsDto) {
    return this.userService.login(credentials);
  }

  @Get('all')
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}