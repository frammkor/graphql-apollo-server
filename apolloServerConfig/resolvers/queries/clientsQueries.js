import mongoose from 'mongoose';
import { Client, Order } from '../../../models';

const clientsQueries = {
  getTotalClients: (root) => new Promise((resolve, reject) => {
    Client.countDocuments({}, (err, count) => {
      if (err) {
        reject(err);
      } else { resolve(count); }
    });
  }),

  getClients: (root, { limit, offset, userId }) => new Promise((resolve, reject) => {
    let filter;
    if (userId) {
      filter = { userId: mongoose.Types.ObjectId(userId) };
    }

    Client.find(filter).limit(limit).skip(offset)
      .then(
        (clients) => resolve(clients),
      )
      .catch((err) => reject(err));
  }),

  getClientById: (root, { clientId }) => new Promise((resolve, reject) => {
    Client.findById(clientId)
      .then(
        (client) => resolve(client),
      )
      .catch(
        (err) => reject(err),
      );
  }),

  getTopClientBySpends: (root) => new Promise((resolve, reject) => {
    Order.aggregate([
      {
        $match: { status: 'COMPLEATED' },
      },
      {
        $group: {
          _id: '$clientId',
          totalSpend: { $sum: '$totalPrice' },
        },
      },
      {
        $lookup: {
          from: 'clients',
          localField: '_id',
          foreignField: '_id',
          as: 'clientInfo',
        },
      },
      {
        $sort: { totalSpend: -1 },
      },
      {
        $limit: 10,
      },
    ], (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  }),
};

export default clientsQueries;
