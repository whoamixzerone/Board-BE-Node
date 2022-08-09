const { Post, sequelize } = require('../models');

const setError = (status = 500, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

/**
 * @whoamixzerone
 * @param {object} postDto : title, content, user.id, user.name
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
 * @param {object} postDto : id, title, content, user.id, user.name
 * @returns {Error}
 */
const update = async (postDto) => {
  try {
    const result = await Post.update(postDto, { where: { id: postDto.id } });
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
 * @param {number} id
 * @returns {Error}
 */
const destroy = async (id) => {
  try {
    const result = await Post.destroy({ where: { id } });
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
 * @param {number} id
 * @returns {Error}
 */
const restore = async (id) => {
  try {
    const result = await Post.restore({ where: { id } });
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

module.exports = {
  create,
  update,
  destroy,
  restore,
};
