import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { JwtModule, JwtService} from '@nestjs/jwt';
import { AppConstants } from '../config/constants/constants.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ UserEntity ]),
    JwtModule.register({
      secret: AppConstants.secret,
      signOptions: { expiresIn: '3600s' },
     })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
