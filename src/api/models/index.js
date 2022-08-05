const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../../config/config.js'))[env];

const User = require('./user');
const Post = require('./post');

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;

User.init(sequelize);
Post.init(sequelize);

User.associate(db);
Post.associate(db);

module.exports = db;
