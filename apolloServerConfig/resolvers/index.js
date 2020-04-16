import { Client, Product, Order, User } from '../../models';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import { createToken } from '../../assets/auth';
// const ObjectId = mongoose.Types.ObjectId
import { clientsQueries, productsQueries, ordersQueries, usersQueries } from './queries'
import { clientsMutations, productsMutations, ordersMutations, usersMutations } from './mutations'

const resolvers = {
  Query: {
    ...clientsQueries, ...productsQueries, ...ordersQueries, ...usersQueries
  },
  Mutation: {
    ...clientsMutations, ...productsMutations, ...ordersMutations, ...usersMutations
  }
};

export default resolvers;
