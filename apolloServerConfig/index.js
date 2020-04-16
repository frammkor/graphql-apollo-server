// AUTH
import { verifyToken } from '../assets/auth';

// GRAPHQL
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers['authorization'];
    if (token !== 'null') {
      try {
        // verify the token coming from the client
        const user = await verifyToken(token);
        req.currentUser = user;
        return user
      } catch (error) {
        console.log(error);
      }
    }
  }
});

export default server;