import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entity/user.entity';
import { LoginCredentialsDto } from './dto/loginCredentials.dto';
import { UserSubscribeDto } from './dto/userSubscribe.dto'; 
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService) {}

    async register(userSubscribeDto: UserSubscribeDto): Promise<Partial<UserEntity>> {
      const user = this.userRepository.create({...userSubscribeDto});
      user.salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, user.salt);
      try { await this.userRepository.save(user);} 
      catch (e) {throw new ConflictException("The username must be unique!");}
      return {
          id: user.id,
          username: user.username,
          /*ticketOfficeNumber: user.ticketOfficeNumber*/
      };
    }  

  async login(credentials: LoginCredentialsDto)  {
    const {username, password} = credentials;
    const user = await this.userRepository.createQueryBuilder("user")
      .where("user.username = :username", {username})
      .getOne();
    if (!user) throw new NotFoundException('Wrong username or password!');
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword === user.password) {
      const payload = {
        username: user.username
      };
      const jwt = this.jwtService.sign(payload);
      return {
        "access_token" : jwt
      };
    } 
    else {
      throw new NotFoundException('Wrong username or password!');
    }
  }

  async findAll(options = null): Promise<UserEntity[]> {
    if (options) {
      return await this.userRepository.find(options);
    }
    return await this.userRepository.find();
  }
}