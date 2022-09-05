import AppDataSource from '../config/data-source';

const dbConnect = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization ', err);
    });
};

export default dbConnect;
