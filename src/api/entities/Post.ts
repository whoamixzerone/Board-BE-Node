/* eslint-disable import/no-cycle */
import { Length } from 'class-validator';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';
import AppDataSource from '../../config/data-source';
import DefaultEntity from './DefaultEntity';
import User from './User';

@Entity('posts')
class Post extends DefaultEntity {
  @Length(1, 100, { message: '제목은 한 글자 이상이어야 합니다' })
  @Column()
  title?: string;

  @Length(1, 255, { message: '내용은 한 글자 이상이어야 합니다' })
  @Column({ type: 'text' })
  content?: string;

  @Column({ default: 0 })
  views!: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user!: User;

  @DeleteDateColumn()
  deletedAt!: Date;
}

export default Post;
