import mongoose from 'mongoose';
// database URL
import { dbURI } from './env';

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('ERROR', err.message));
