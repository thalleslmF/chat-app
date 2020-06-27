import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequest } from './user.request';
import { UserEntity } from './user.entity';
import { UserResponse } from './user.response';
import { JwtService } from '@nestjs/jwt';




@Controller('/user')
export class UserController {


  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

  @Post()
  public async createUser(@Body() userRequest: UserRequest): Promise<UserResponse> {

      const user: UserEntity = await this.userService.loginUser(userRequest);
      return  user.toResponse(this.jwtService.sign({ id: user.id }));
  }

}
