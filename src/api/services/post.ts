import { validate } from 'class-validator';
import * as httpStatus from 'http-status';
import AppDataSource from '../../config/data-source';
import Post from '../entities/Post';
import User from '../entities/User';
import CustomError from '../exceptions/customError';
import { PostIdAndUser, RequestIdAndPost, RequestPost } from '../interfaces/post';

/**
 * @whoamixzerone
 * @param {object} postDto : title, content, user
 * @returns {Promise} postDTO
 */
export const create = async (postDto: RequestPost) => {
  const { title, content, user } = postDto;

  try {
    const post = new Post();
    post.title = title;
    post.content = content;
    post.user = user as User;

    const errors = await validate(post);
    if (errors.length > 0) {
      if (errors[0].constraints) {
        return new CustomError(httpStatus.BAD_REQUEST, Object.values(errors[0].constraints)[0]);
      }
    }

    return await post.save();
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

/**
 * @whoamixzerone
 * @param {object} postDto : id, title, content
 * @returns {Promise} Post | CustomError
 */
export const update = async (postDto: RequestIdAndPost): Promise<Post | CustomError> => {
  const { id, title, content } = postDto;
  try {
    const post = new Post();
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }

    const errors = await validate(post, { skipMissingProperties: true });
    if (errors.length > 0) {
      if (errors[0].constraints) {
        return new CustomError(httpStatus.BAD_REQUEST, Object.values(errors[0].constraints)[0]);
      }
    }

    const postRepository = await AppDataSource.getRepository(Post);
    const result = await postRepository.update(id, post);
    if (result.affected === 0) {
      return new CustomError(httpStatus.NOT_FOUND, '해당 게시물을 찾을 수 없습니다');
    }

    const resultPost = await postRepository.findOne({
      select: ['id', 'createdAt', 'updatedAt', 'title', 'content', 'views'],
      where: { id },
    });
    if (!resultPost) {
      return new CustomError(httpStatus.NOT_FOUND, '해당 게시물을 찾을 수 없습니다');
    }

    return resultPost;
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

/**
 * @whoamixzerone
 * @param {object} postDto : id, user
 * @returns {Promise} Post | CustomError
 */
export const destroy = async (postDto: PostIdAndUser): Promise<Post | CustomError> => {
  const { id, user } = postDto;

  try {
    const postRepository = await AppDataSource.getRepository(Post);
    const post = await postRepository.findOne({ where: { id } });
    if (!post) {
      return new CustomError(httpStatus.NOT_FOUND, '해당 게시물을 찾을 수 없습니다');
    }

    await postRepository.softDelete(id);

    return post;
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

/**
 * @whoamixzerone
 * @param {object} postDto : id, user
 * @returns {Promise} Post | CustomError
 */
export const restore = async (postDto: PostIdAndUser): Promise<Post | CustomError> => {
  const { id, user } = postDto;

  try {
    const postRepository = await AppDataSource.getRepository(Post);
    const post = await postRepository.findOne({ where: { id }, withDeleted: true });
    if (!post || post.deletedAt == null) {
      return new CustomError(
        httpStatus.NOT_FOUND,
        '존재하지 않는 게시글이거나, 삭제되지 않는 게시글입니다',
      );
    }

    await postRepository.restore(id);

    return post;
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

/**
 * @whoamixzerone
 * @param {number} id
 * @returns {Promise} Post | CustomError
 */
export const updateAndFindId = async (id: number): Promise<Post | CustomError> => {
  try {
    const postRepository = await AppDataSource.getRepository(Post);
    const exPost = await postRepository.findOne({ where: { id } });
    if (!exPost) {
      return new CustomError(httpStatus.NOT_FOUND, '해당 게시물을 찾을 수 없습니다');
    }
    const views = exPost.views + 1;
    const result = await postRepository.update(id, { views });
    if (result.affected === 0) {
      return new CustomError(httpStatus.NOT_FOUND, '존재하지 않는 게시글입니다');
    }

    const post = await postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user')
      .select([
        'post.id',
        'post.createdAt',
        'post.title',
        'post.content',
        'post.views',
        'user.name',
      ])
      .getOne();
    if (!post) {
      return new CustomError(httpStatus.NOT_FOUND, '해당 게시물을 찾을 수 없습니다');
    }

    return post;
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

/**
 * @whoamixzerone
 * @returns {Promise} Post[] | CustomError
 */
export const getList = async (): Promise<Post[] | CustomError> => {
  try {
    const postRepository = await AppDataSource.getRepository(Post);
    return await postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user')
      .select(['post.id', 'post.createdAt', 'post.title', 'post.views', 'user.name'])
      .getMany();
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
