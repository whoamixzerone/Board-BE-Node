const { Post, sequelize, User } = require('../models');

const setError = (status = 500, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

/**
 * @whoamixzerone
 * @param {object} postDto : title, content, userId, name
 * @returns {Promise|Error} postDTO
 */
const create = async (postDto) => {
  try {
    // MySQL 문법
    // const query =
    //   'INSERT INTO posts (title, content, createdAt, updatedAt, userId) VALUES(?, ?, ?, ?, ?)';
    // const post = await sequelize.query(query, {
    //   type: sequelize.QueryTypes.INSERT,
    //     replacements: [
    //       postDto.title,
    //       postDto.content,
    //       new Date(),
    //       new Date(),
    //       postDto.userId,
    //     ],
    // });
    const result = await Post.create(postDto);
    return { id: result.dataValues.id };
  } catch (err) {
    console.error(err);
    return setError(err);
  }
};

/**
 * @whoamixzerone
 * @param {object} postDto : id, title, content, userId, name
 * @returns {Error}
 */
const update = async (postDto) => {
  try {
    const result = await Post.update(postDto, { where: { id: postDto.id, userId: postDto.userId } });
    if (result[0] === 0) {
      return setError(404, '존재하지 않는 게시글입니다');
    }
  } catch (err) {
    console.error(err);
    return setError(err);
  }
};

/**
 * @whoamixzerone
 * @param {object} postDto : id, userId, name
 * @returns {Error}
 */
const destroy = async (postDto) => {
  try {
    const result = await Post.destroy({ where: { id: postDto.id, userId: postDto.userId } });
    if (result === 0) {
      return setError(404, '존재하지 않는 게시글입니다');
    }
  } catch (err) {
    console.error(err);
    return setError(err);
  }
};

/**
 * @whoamixzerone
 * @param {object} postDto : id, userId, name
 * @returns {Error}
 */
const restore = async (postDto) => {
  try {
    const result = await Post.restore({ where: { id: postDto.id, userId: postDto.userId } });
    if (result === 0) {
      return setError(
        404,
        '존재하지 않는 게시글이거나, 삭제되지 않는 게시글입니다',
      );
    }
  } catch (err) {
    console.error(err);
    return setError(err);
  }
};

/**
 * @whoamixzerone
 * @param {number} id
 * @returns {Post|Error}
 */
const updateAndFindId = async (id) => {
  try {
    const post = await Post.findByPk(id);
    if (post === null) {
      return setError(404, '존재하지 않는 게시글입니다');
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
  } catch (err) {
    console.error(err);
    return setError(err);
  }
};

/**
 * @whoamixzerone
 * @returns {Post|Error}
 */
const getList = async () => {
  try {
    // MySQL 문법
    // const query = 'SELECT * FROM posts';
    // const posts = await sequelize.query(query, {
    //   type: sequelize.QueryTypes.SELECT,
    // });
    return await Post.findAll({
      attributes: { exclude: ['content', 'deletedAt', 'userId'] },
      include: {
        model: User,
        attributes: ['id', 'name'],
      },
    });
  } catch (err) {
    console.error(err);
    return setError(err);
  }
};

module.exports = {
  create,
  update,
  destroy,
  restore,
  updateAndFindId,
  getList,
};
