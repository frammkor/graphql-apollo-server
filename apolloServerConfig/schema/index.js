import { importSchema } from 'graphql-import';

const typeDefs = importSchema('apolloServerConfig/schema/schema.graphql');

export default typeDefs;
