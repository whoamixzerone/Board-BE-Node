import { Length } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import DefaultEntity from './DefaultEntity';
import Post from './Post';
import User from './User';

@Entity('comments')
class Comment extends DefaultEntity {
  @Length(1, 255, { message: '댓글 내용은 1자 이상이어야 합니다' })
  @Column()
  content!: string;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post!: Post;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user!: User;
}

export default Comment;
