import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from '../../chat/entity/chat.entity';
import { UserEntity } from '../../user/user.entity';
import { MessageEntity } from '../../message/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'masterdev',
      password: 'masterdev',
      database: 'masterdev',
      entities: [ChatEntity, UserEntity, MessageEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
