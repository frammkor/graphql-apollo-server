import mongoose from 'mongoose';
import Client from '../models/Client';

const resolvers = {
  Query: {
    getClients: () => new Promise((resolve, reject) => {
      Client.find({}, (err, clients) => {
        if (err) {
          reject(err);
        } else { resolve(clients); }
      });
    }),
    getNClients: (root, { num }) => new Promise((resolve, reject) => {
      Client.find().limit(num)
        .then(
          (clients) => resolve(clients),
        )
        .catch((err) => reject(err));
    }),
    getClient: (root, { id }) => Client.findById(id),
  },
  Mutation: {
    createClient: (root, { input }) => {
      console.log("input", input)
      const {
        firstName, lastName, company, email, type, orders, age,
      } = input;
      const newClient = new Client({
        firstName,
        lastName,
        company,
        email,
        age,
        type,
        orders,
      });
      return new Promise((resolve, reject) => {
        newClient.save((err) => {
          if (err) { reject(err); } else { resolve(newClient); }
        });
      });
    },
    updateClient: (root, { input }) => new Promise((resolve, reject) => {
      Client.findByIdAndUpdate(input.id, input, { new: true }, (err, client) => {
        if (err) { reject(err); } else { resolve(client); }
      });
    }),
    deleteClient: (root, { id }) => new Promise((resolve, reject) => {
      Client.findByIdAndDelete(id, (err, res) => {
        if (err) {
          reject(err);
        } if (res) {
          resolve(`Client ${id} has been deleted`);
        } else {
          resolve(`No client with id '${id}' has been found`);
        }
      });
    }),
  },
};

export default resolvers;
