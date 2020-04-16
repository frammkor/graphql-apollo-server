import { Order, Product } from '../../../models';

const ordersMutations = {
  createOrder: (root, { input }) => {
    const {
      productsRequested,
      totalPrice,
      clientId,
      userId,
    } = input;
    const newOrder = new Order({
      productsRequested,
      totalPrice,
      date: new Date(),
      clientId,
      status: 'PENDING',
      userId,
    });
    return new Promise((resolve, reject) => {
      newOrder.save((err) => {
        if (err) { reject(err); } else { resolve(newOrder); }
      });
    });
  },

  updateOrder: (root, { input }) => new Promise((resolve, reject) => {
    const { status } = input;
    let instruction;
    switch (status) {
      case 'COMPLEATED':
        instruction = '-';
        break;
      case 'CANCELED':
        instruction = '+';
        break;
      default:
        break;
    }
    input.productsRequested.forEach((product) => {
      Product.updateOne({ _id: product.id }, {
        $inc: {
          stock: `${instruction}${product.amount}`,
        },
      }, (err) => { if (err) return new Error(err); });
    });

    Order.findByIdAndUpdate(input.id, input, { new: true }, (err, data) => {
      if (err) { reject('MongoDB Err: ', err); } else { resolve('Order updated'); }
    });
  }),

};

export default ordersMutations;
