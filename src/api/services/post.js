const { raw } = require('express');
const { Post, sequelize } = require('../models');

/**
 * @whoamixzerone
 * @param {object} postDto : title, content, userId
 * @returns {Promise} postDTO
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
    return await Post.create(postDto);
  } catch (err) {
    console.error(err);
    return new Error(err);
  }
};

module.exports = {
  create,
};
