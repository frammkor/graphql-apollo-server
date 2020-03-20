import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const logger = { log: (err) => console.log(err) };

const typeDefs = importSchema('data/schema.graphql');

const schema = makeExecutableSchema({ typeDefs, resolvers, logger });

export { schema };
