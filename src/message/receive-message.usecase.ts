import {BadRequestException, Injectable} from '@nestjs/common';
import { ChatEntity } from '../chat/entity/chat.entity';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';
import { MessageDto } from './message.request';
import { UserEntity } from '../user/user.entity';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import {ChatRepository} from '../chat/repository/chat.repository';

@Injectable()
export class ReceiveMessageUsecase {
    constructor(
      @InjectRepository(MessageEntity)
      private readonly messageRepository: Repository<MessageEntity>,
      @InjectRepository(ChatRepository)
      private readonly chatRepository: ChatRepository,
      @InjectRepository(UserEntity)
      private readonly userRepository: Repository<UserEntity>) {

    }

    public async execute(messageDto: MessageDto) {
        const chat = await this.validateChatMessage(messageDto);
        if (chat) {
            await this.messageRepository.save(this.mapToMessage(messageDto));
            return this.chatRepository.findWithRelations(chat.id)
        }else {
            throw new BadRequestException('Mensagem inválida');
        }
    }

    private async validateChatMessage(messageDto: MessageDto) {
        try {
            const chat: ChatEntity = await this.chatRepository.findOneOrFail({ where : { id: messageDto.chat } })
            console.log(chat)
            const sender: UserEntity = await this.userRepository.findOneOrFail({ where: { id: messageDto.sender } })
            const memberFiltered = chat.members.filter(member => member.id === sender.id)
            if (memberFiltered) {
                return chat;
            }
        } catch (error) {
            return null;
        }
        return null;
    }

    private mapToMessage(messageDto: MessageDto) {
        return plainToClass(MessageEntity, messageDto);
    }
}
