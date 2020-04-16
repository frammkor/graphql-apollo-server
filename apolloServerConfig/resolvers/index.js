// const ObjectId = mongoose.Types.ObjectId
import {
  clientsQueries, productsQueries, ordersQueries, usersQueries,
} from './queries';
import {
  clientsMutations, productsMutations, ordersMutations, usersMutations,
} from './mutations';

const resolvers = {
  Query: {
    ...clientsQueries, ...productsQueries, ...ordersQueries, ...usersQueries,
  },
  Mutation: {
    ...clientsMutations, ...productsMutations, ...ordersMutations, ...usersMutations,
  },
};

export default resolvers;
