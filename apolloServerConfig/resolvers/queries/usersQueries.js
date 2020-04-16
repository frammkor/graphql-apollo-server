import { User, Order } from '../../../models';

const usersQueries = {
  getCurrentUser: (root, args, { userName }) => {
    if (!userName) { return null; }
    const validUser = User.findOne({ userName });
    return validUser;
  },
  getTopSellerBySpends: (root) => new Promise((resolve, reject) => {
    Order.aggregate([
      {
        $match: { status: 'COMPLEATED' },
      },
      {
        $group: {
          _id: '$userId',
          totalSpend: { $sum: '$totalPrice' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userInfo',
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

export default usersQueries;
