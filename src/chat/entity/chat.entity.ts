import {
  BaseEntity,
  Column,
  Entity, JoinTable, ManyToMany, OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageEntity } from '../../message/message.entity';
import { UserEntity } from '../../user/user.entity';

@Entity()
export class ChatEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToMany(
    type => UserEntity,
    userEntity => userEntity.chats,
    {  eager: true }
  )
  public members: UserEntity[];

  @OneToMany(() => MessageEntity,
    messageEntity => messageEntity.chat)
  public messages: MessageEntity[];

  constructor(
    members: UserEntity[],
    messages: MessageEntity[],
  ) {
    super();
    this.members = members;
    this.messages = messages;
  }
}
