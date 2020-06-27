import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './config/database/database.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
@Module({
  imports: [UserModule, ChatModule, DatabaseModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
