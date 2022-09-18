/* eslint-disable import/no-cycle */
import { IsEmail, Length } from 'class-validator';
import { BeforeInsert, Column, Entity, Index, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import DefaultEntity from './DefaultEntity';
import Post from './Post';

@Entity('users')
class User extends DefaultEntity {
  @Index()
  @IsEmail(undefined, { message: '이메일 형식에 맞게 입력해주세요' })
  @Length(1, 50, { message: '이메일 주소는 비워둘 수 없습니다' })
  @Column({ unique: true })
  email!: string;

  @Length(2, 32, { message: '사용자 이름은 2자 이상이어야 합니다' })
  @Column()
  name!: string;

  @Length(6, 12, { message: '비밀번호는 6~12자리여야 합니다' })
  @Column({ length: 100 })
  password!: string;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

  @BeforeInsert()
  async hassPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}

export default User;
