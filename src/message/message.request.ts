
import { ChatEntity } from '../chat/entity/chat.entity';

export class MessageDto {

  public message?: string;

  public file?: BinaryType;

  public sender: number;

  public chat: number;

  constructor(
    senderId: number,
    chatId: number,
    message?: string,
    file?: BinaryType
  ) {

    this.message = message;
    this.file = file;
    this.sender = senderId;
    this.chat = chatId;
  }
}
