import express from 'express';

// graphQL
import graphqlHTTP from 'express-graphql';
import schema from './data/schema';

// port config
import { port } from './config/env';

// database conection
require('./config/database');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    // set the schema to use in this url
    schema,
    // utilize graphical
    graphiql: true,
  }),
);
app.listen(port, () => console.log(`Server listening on port ${port}`));
