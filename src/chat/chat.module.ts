import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entity/chat.entity';
import { ChatGateway } from './gateway/chat.gateway';
import { JwtStrategy } from '../config/security/jwt.strategy';
import { JwtAuthGuard } from '../config/security/jwt-auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppConstants } from '../config/constants/constants.config';
import { CreateChatUseCase } from './create-chat.usecase';
import { UserEntity } from '../user/user.entity';
import {ChatRepository} from './repository/chat.repository';
@Module({
  imports: [TypeOrmModule.forFeature([ChatRepository, UserEntity]), JwtModule.register({
    secret: AppConstants.secret,
    signOptions: { expiresIn: '3600s' },
  })],
  providers: [ChatGateway, JwtStrategy, JwtAuthGuard, CreateChatUseCase],
  controllers: [],
})
export class ChatModule { }
