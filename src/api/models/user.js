const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
          validate: {
            min: 6,
          },
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('now()'),
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: false,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post, {
      foreignKey: { name: 'userId', allowNull: false },
    });
  }
};
