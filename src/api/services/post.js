const { Post, sequelize } = require('../models');

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
    return new Error(err);
  }
};

/**
 * @whoamixzerone
 * @param {object} postDto : id, title, content, user.id, user.name
 * @returns {Promise|Error} postDTO
 */
const update = async (postDto) => {
  try {
    const result = await Post.update(postDto, { where: { id: postDto.id } });
    if (result[0] === 0) {
      const error = new Error('존재하지 않는 게시글입니다');
      error.status = 404;
      return error;
    }
  } catch (err) {
    console.error(err);
    return new Error(err);
  }
};

module.exports = {
  create,
  update,
};
