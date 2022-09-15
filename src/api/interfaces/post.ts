import User from '../entities/User';

interface RequestPost {
  title: string;
  content: string;
  user: Pick<User, 'id' | 'name'>;
}

interface RequestIdAndPost {
  id: number;
  title?: string;
  content?: string;
}

interface ResponsePost {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  views: number;
}

interface PostIdAndUser {
  id: number;
  user: Pick<User, 'id' | 'name'>;
}

export { RequestPost, RequestIdAndPost, ResponsePost, PostIdAndUser };
