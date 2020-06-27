import {BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import { ChatEntity } from '../chat/entity/chat.entity';
import { UserResponse } from './user.response';
@Entity()
export  class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  imageUrl: string;


  @ManyToMany(
    type => ChatEntity,
    chatEntity => chatEntity.members
  )
  @JoinTable()
  chats?: ChatEntity[];

  constructor(name: string, email: string, imageUrl: string) {
    super();
    this.name = name;
    this.email = email;
    this.imageUrl  = imageUrl;
  }

  public toResponse(token: string) {
    return new UserResponse(this.id, token);
  }

}
