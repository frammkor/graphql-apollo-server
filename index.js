// LIBS
import express from "express";

// APOLLO SERVER
import server from './config/apolloServerConfig';

// PORT
import { port } from './config/env';

// ────────────────────────────────────────────────────────────────────────────────────────────────

// DB CONNECTION
require('./config/database');


const app = express();

// app.get('/', (req, res) => {
//   res.send('hola')
// });

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(
    `The server is running: http://localhost:8000${server.graphqlPath}`
  )
);
