import {Injectable, NotFoundException} from '@nestjs/common';
import { ChatEntity } from '../chat/entity/chat.entity';
import { Repository } from 'typeorm';
import { ChatRequest } from './dto/chat.request';
import { UserEntity } from '../user/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {ChatRepository} from './repository/chat.repository';


@Injectable()
export class CreateChatUseCase {
  constructor(
    @InjectRepository(ChatRepository)
    private readonly chatRepository: ChatRepository,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) {

  }

  public async execute(chatRequest: ChatRequest): Promise<ChatEntity> {
    const users: UserEntity[] = await this.getUsersChatById(chatRequest.usersId)
    return this.chatRepository.save(new ChatEntity(users, []));
  }

  private async getUsersChatById(usersId: number[]):Promise<UserEntity[]> {
    return Promise.all(usersId.map(
        userId => this.verifyUserExistence(userId)
      )
    )
  }

  private async verifyUserExistence(userId: number) {
    const user = await this.userRepository.findOne({ where:
        { id: userId }
    })
    if (!user) {
      throw new NotFoundException(`Usuário ${userId} não encontrado`)
    }
    return user;
  }
}
