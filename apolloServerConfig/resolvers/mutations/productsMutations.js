import { Product } from '../../../models';

const productsMutations = {
  createProduct: (root, { input }) => {
    const {
      name,
      price,
      stock,
    } = input;
    const newProduct = new Product({
      name,
      price,
      stock,
    });
    return new Promise((resolve, reject) => {
      newProduct.save((err) => {
        if (err) { reject(err); } else { resolve(newProduct); }
      });
    });
  },

  updateProduct: (root, { input }) => new Promise((resolve, reject) => {
    Product.findByIdAndUpdate(input.id, input, { new: true }, (err, client) => {
      if (err) { reject(err); } else { resolve(client); }
    });
  }),

  deleteProduct: (root, { id }) => new Promise((resolve, reject) => {
    Product.findByIdAndDelete(id, (err, res) => {
      if (err) {
        reject(err);
      } if (res) {
        resolve(`Client ${id} has been deleted`);
      } else {
        resolve(`No client with id '${id}' has been found`);
      }
    });
  }),
};

export default productsMutations;
