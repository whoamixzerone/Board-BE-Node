import * as httpStatus from 'http-status';
import Post from '../entities/Post';
import CustomError from '../exceptions/customError';

/**
 * @whoamixzerone
 * @param {object} postDto : title, content, userId, name
 * @returns {Promise|Error} postDTO
 */
export const create = async (postDto: Post) => {
  try {
    const result = await Post.create(postDto);
    return { id: result.dataValues.id };
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

/**
 * @whoamixzerone
 * @param {object} postDto : id, title, content, userId, name
 * @returns {Error}
 */
export const update = async (postDto: Post) => {
  try {
    const result = await Post.update(postDto, {
      where: { id: postDto.id, userId: postDto.userId },
    });
    if (result[0] === 0) {
      return new CustomError(httpStatus.NOT_FOUND, '존재하지 않는 게시글입니다');
    }
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

/**
 * @whoamixzerone
 * @param {object} postDto : id, userId, name
 * @returns {Error}
 */
export const destroy = async (postDto: Post) => {
  try {
    const result = await Post.destroy({ where: { id: postDto.id, userId: postDto.userId } });
    if (result === 0) {
      return new CustomError(httpStatus.NOT_FOUND, '존재하지 않는 게시글입니다');
    }
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

/**
 * @whoamixzerone
 * @param {object} postDto : id, userId, name
 * @returns {Error}
 */
export const restore = async (postDto: Post) => {
  try {
    const result = await Post.restore({ where: { id: postDto.id, userId: postDto.userId } });
    if (result === 0) {
      return new CustomError(
        httpStatus.NOT_FOUND,
        '존재하지 않는 게시글이거나, 삭제되지 않는 게시글입니다',
      );
    }
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

/**
 * @whoamixzerone
 * @param {number} id
 * @returns {Post|Error}
 */
export const updateAndFindId = async (id: number) => {
  try {
    const post = await Post.findByPk(id);
    if (post === null) {
      return new CustomError(httpStatus.NOT_FOUND, '존재하지 않는 게시글입니다');
    }

    const views = post.get('views') + 1;
    await Post.update({ views }, { where: { id } });

    return await Post.findByPk(id, {
      attributes: { exclude: ['deletedAt', 'userId'] },
      include: {
        model: User,
        attributes: ['id', 'name'],
      },
    });
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

/**
 * @whoamixzerone
 * @returns {Post|Error}
 */
export const getList = async () => {
  try {
    return await Post.findAll({
      attributes: { exclude: ['content', 'deletedAt', 'userId'] },
      include: {
        model: User,
        attributes: ['id', 'name'],
      },
    });
  } catch (err: any) {
    console.error(err);
    return new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
