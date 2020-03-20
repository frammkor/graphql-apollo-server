import express from 'express';

// graphQL
import graphqlHTTP from 'express-graphql';
import { schema } from './data/schema';

// config
import { port } from './config/config';

// database conection
require('./config/database');

const app = express();

app.get('/', (req, res) => {
    res.send('Up and running');
});

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
