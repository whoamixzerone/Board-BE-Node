/* eslint-disable import/no-cycle */
import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';
import DefaultEntity from './DefaultEntity';
import User from './User';

@Entity('posts')
class Post extends DefaultEntity {
  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column({ default: 0 })
  views!: number;

  @ManyToOne(() => User, (user) => user.posts)
  user!: User;

  @DeleteDateColumn()
  deletedAt!: Date;
}

export default Post;
