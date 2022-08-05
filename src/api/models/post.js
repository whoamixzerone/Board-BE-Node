const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        views: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        underscored: false,
        modelName: 'Post',
        tableName: 'posts',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User, {
      foreignKey: { name: 'userId', allowNull: false },
    });
  }
};
