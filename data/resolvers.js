import mongoose from 'mongoose';
import Client from '../models/Client';

// class Client {
//   constructor(id, {
//     firstName, lastName, company, emails, type, orders,
//   }) {
//     this.id = id;
//     this.lastName = lastName;
//     this.firstName = firstName;
//     this.company = company;
//     this.emails = emails;
//     this.type = type;
//     this.orders = orders;
//   }
// }

const resolvers = {
  Query: {
    getClient: ({ id }) => {
      console.log('console.log id', id);
      return new Client(id, clientsDB[id]);
    },
  },
  Mutation: {
    createClient: (root, { input }) => {
      console.log('input: ', input);
      const id = require('crypto')
        .randomBytes(10)
        .toString('hex');
      clientsDB[id] = input;
      return new Client(id, input);
    },
  },
};

export default resolvers;