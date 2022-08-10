const { sequelize } = require('../api/models');

exports.connect = () => {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log('DataBase Connected');
    })
    .catch((err) => {
      console.error(err);
    });
};
