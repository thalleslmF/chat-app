
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ChatEntity } from '../chat/entity/chat.entity';

@Entity()
export class MessageEntity extends BaseEntity{

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ nullable: true})
  public message?: string;

  @Column({ nullable: true})
  public file?: BinaryType;

  @Column()
  public sender: number;

  @ManyToOne(() => ChatEntity,
    chatEntity => chatEntity.messages)
  public chat: ChatEntity;

  constructor(
    sender: number,
    chat: ChatEntity,
    message?: string,
    file?: BinaryType
  ) {
    super();
    this.message = message;
    this.file = file;
    this.sender = sender;
    this.chat = chat;
  }
}
