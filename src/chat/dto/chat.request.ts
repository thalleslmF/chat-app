import { ChatEntity } from '../entity/chat.entity';

export class ChatRequest {
  usersId : number[]

  constructor(
    usersId: number[]
  ) {

    this.usersId = usersId
  }
}
