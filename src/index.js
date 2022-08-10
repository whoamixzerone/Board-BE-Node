const app = require('./loaders/app');
const mysql = require('./loaders/mysql');

app.set('port', process.env.PORT || 3000);

mysql.connect();

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'port listening');
});
