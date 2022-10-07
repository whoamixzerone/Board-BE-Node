import Post from '../entities/Post';
import User from '../entities/User';

interface RequestIdAndComment {
  content: string;
  post: Pick<Post, 'id'>;
  user: Pick<User, 'id' | 'name'>;
}

export { RequestIdAndComment };
