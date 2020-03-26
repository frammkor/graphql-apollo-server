// LIBS
import express from "express";

// GRAPHQL
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./data/schema";
import resolvers from "./data/resolvers";

// PORT
import { port } from './config/env';

// ────────────────────────────────────────────────────────────────────────────────────────────────

// DB CONNECTION
require('./config/database');


const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

// app.get('/', (req, res) => {
//   res.send('hola')
// });

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(
    `The server is running: http://localhost:8000${server.graphqlPath}`
  )
);
