import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { ReceiveMessageUsecase } from './receive-message.usecase';
import { ChatEntity } from '../chat/entity/chat.entity';
import { UserEntity } from '../user/user.entity';
import { MessageGateway } from './message.gateway';
import { JwtAuthGuard } from '../config/security/jwt-auth.guard';
import { JwtStrategy } from '../config/security/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AppConstants } from '../config/constants/constants.config';
import {ChatRepository} from '../chat/repository/chat.repository';

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity, UserEntity, ChatRepository] ), JwtModule.register({
        secret: AppConstants.secret,
        signOptions: { expiresIn: '3600s' },
    })],
    controllers: [],
    providers: [ReceiveMessageUsecase, JwtAuthGuard, JwtStrategy, MessageGateway]
})
export class MessageModule { }
