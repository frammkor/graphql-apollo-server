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
}

export default clientsMutations;