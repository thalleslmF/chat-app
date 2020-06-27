import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserRequest } from './user.request';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  public async loginUser(userRequest: UserRequest) {
    const userDatabase: UserEntity | undefined = await this.findUser(userRequest);
    if (!userDatabase) {
      return await this.userRepository.save(UserService.mapToUserEntity(userRequest));
    }
    return userDatabase;
  }

  public async findUser(userRequest: UserRequest) {
    return await this.userRepository.findOne({ where: { email: userRequest.email} })
  }
  private static mapToUserEntity(userRequest: UserRequest) {
    return plainToClass(UserEntity, userRequest);
  }
}
