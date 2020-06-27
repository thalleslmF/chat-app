import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtAuthGuard } from '../../config/security/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { MessageEntity } from '../../message/message.entity';
import { MessageDto } from '../../message/message.request';
import { ChatRequest } from '../dto/chat.request';
import { CreateChatUseCase } from '../create-chat.usecase';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  private server: Server | undefined;
  constructor(private readonly createChatUseCase: CreateChatUseCase ){ }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('events')
  public async receiveTestMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() chatMessage: string,
  ): Promise<void> {
    console.log(socket)
    console.log(socket.handshake.headers.userId)
    this.server?.emit('events', chatMessage);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('chat')
  public async createChat(
    @ConnectedSocket() socket: Socket,
    @MessageBody() chatRequest: ChatRequest,
  ): Promise<void> {
    console.log(chatRequest)
    this.server?.emit('events', await this.createChatUseCase.execute(chatRequest));
  }

}
