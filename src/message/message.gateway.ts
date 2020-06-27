import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../config/security/jwt-auth.guard';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './message.request';
import { ReceiveMessageUsecase } from './receive-message.usecase';
@WebSocketGateway()
export class MessageGateway {
  @WebSocketServer()
  private server: Server | undefined;

  constructor(private readonly receiveMessageUsecase: ReceiveMessageUsecase) {
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('message')
  public async receiveMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() messageDto: MessageDto,
  ): Promise<void> {
    console.log(messageDto)
   const chat =  await this.receiveMessageUsecase.execute(messageDto)
    this.server?.emit('chat', chat );
  }
}
