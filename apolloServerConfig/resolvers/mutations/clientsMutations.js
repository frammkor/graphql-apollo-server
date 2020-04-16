import { Client } from '../../../models';

const clientsMutations = {
  createClient: (root, { input }) => {
    const {
      firstName, lastName, company, emails, type, age, userId,
    } = input;
    const newClient = new Client({
      firstName,
      lastName,
      company,
      emails,
      age,
      type,
      userId,
    });
    newClient.clientId = newClient._id;
    return new Promise((resolve, reject) => {
      newClient.save((err) => {
        if (err) { reject(err); } else { resolve(newClient); }
      });
    });
  },

  updateClient: (root, { input }) => new Promise((resolve, reject) => {
    Client.findByIdAndUpdate(input.clientId, input, { new: true }, (err, client) => {
      if (err) { reject(err); } else { resolve(client); }
    });
  }),

  deleteClient: (root, { clientId }) => new Promise((resolve, reject) => {
    Client.findByIdAndDelete(clientId, (err, res) => {
      if (err) {
        reject(err);
      } if (res) {
        resolve(`Client ${clientId} has been deleted`);
      } else {
        resolve(`No client with id '${clientId}' has been found`);
      }
    });
  }),
};

export default clientsMutations;
