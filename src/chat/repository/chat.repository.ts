import { ChatEntity } from '../entity/chat.entity';
import { EntityRepository, Repository} from 'typeorm';

@EntityRepository(ChatEntity)
export class ChatRepository extends Repository<ChatEntity> {


  public async findWithRelations(chatId: number) {
    return await this.findOneOrFail({ where: { id: chatId}, relations: ['messages'] })
  }
}
