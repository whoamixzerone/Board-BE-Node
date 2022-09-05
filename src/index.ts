import app from './loaders/app';
import dbConnect from './loaders/mysql';

app.set('port', process.env.PORT || 3000);

dbConnect();

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'port listening');
});
