import { validate } from 'class-validator';
import * as httpStatus from 'http-status';
import AppDataSource from '../../config/data-source';
import Comment from '../entities/Comment';
import Post from '../entities/Post';
import User from '../entities/User';
import CustomError from '../exceptions/customError';
import { RequestIdAndComment } from '../interfaces/comment';

/**
 * @whoamixzerone
 * @param {object} commentDto : content, post, user
 * @returns {Promise} Comment | CustomError
 */
const create = async (commentDto: RequestIdAndComment): Promise<Comment | CustomError> => {
  try {
    const comment = new Comment();
    comment.content = commentDto.content;
    comment.post = commentDto.post as Post;
    comment.user = commentDto.user as User;

    const errors = await validate(comment);
    if (errors.length > 0) {
      if (errors[0].constraints) {
        return new CustomError(httpStatus.BAD_REQUEST, Object.values(errors[0].constraints)[0]);
      }
    }

    return comment.save();
  } catch (error: unknown) {
    console.error(error);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, (error as Error).message);
  }
};

/**
 * @whoamixzerone
 * @param {number} id
 * @returns {Promise} Comment[] | CustomError
 */
const getList = async (id: number): Promise<Comment[] | CustomError> => {
  try {
    const commentRepository = await AppDataSource.getRepository(Comment);
    return await commentRepository
      .createQueryBuilder()
      .select(['comment.id', 'comment.createdAt', 'comment.content', 'user.name'])
      .from(Comment, 'comment')
      .innerJoin('comment.user', 'user')
      .where('comment.postId = :postId', { postId: id })
      .getMany();
  } catch (error: unknown) {
    console.error(error);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, (error as Error).message);
  }
};

export { create, getList };
