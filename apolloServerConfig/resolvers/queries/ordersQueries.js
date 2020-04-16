import { Order } from '../../../models';

const ordersQueries = {
  getOrders: (root, { limit, offset }) => new Promise((resolve, reject) => {
    Order.find().limit(limit).skip(offset)
      .then(
        (data) => resolve(data),
      )
      .catch((err) => reject(err));
  }),
  getOrdersByClientId: (root, { limit, offset, clientId }) => new Promise((resolve, reject) => {
    let filter;
    if (clientId) {
      filter = { clientId }
    }
    Order.find(filter).limit(limit).skip(offset)
      .then(
        (data) => resolve(data),
      )
      .catch((err) => reject(err));
  })
}

export default ordersQueries;