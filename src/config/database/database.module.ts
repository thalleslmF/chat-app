import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from '../../chat/entity/chat.entity';
import { UserEntity } from '../../user/user.entity';
import { MessageEntity } from '../../message/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL
      entities: [ChatEntity, UserEntity, MessageEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
