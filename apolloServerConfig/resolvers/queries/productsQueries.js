import { Product } from '../../../models';

const productsQueries = {
  // PRODUCTS
  getTotalProducts: (root) => new Promise((resolve, reject) => {
    Product.countDocuments({}, (err, count) => {
      if (err) {
        reject(err);
      } else { resolve(count); }
    });
  }),

  getProducts: (root, { limit, offset, byStock }) => new Promise((resolve, reject) => {
    let filter;
    if (byStock) {
      filter = { stock: { $gt: 0 } };
    }

    Product.find(filter).limit(limit).skip(offset)
      .then(
        (products) => resolve(products),
      )
      .catch((err) => reject(err));
  }),

  getProductById: (root, { id }) => new Promise((resolve, reject) => {
    Product.findById(id)
      .then(
        (product) => resolve(product),
      )
      .catch(
        (err) => reject(err),
      );
  }),
};

export default productsQueries;
