import { Client, Product, Order, User } from '../models';
import mongoose, { PromiseProvider, isValidObjectId } from 'mongoose';
import bcrypt from 'bcrypt'
import { createToken } from '../assets/auth';
// const ObjectId = mongoose.Types.ObjectId

const resolvers = {
  Query: {
    // CLIENTS
    getTotalClients: (root) => new Promise((resolve, reject) => {
      Client.countDocuments({}, (err, count) => {
        if (err) {
          reject(err);
        } else { resolve(count); }
      });
    }),

    getClients: (root, { limit, offset, creatorId }) => new Promise((resolve, reject) => {
      let filter;
      if (creatorId) {
        filter = { creatorId: mongoose.Types.ObjectId(creatorId) }
      }
      Client.find(filter).limit(limit).skip(offset)
        .then(
          (clients) => resolve(clients),
        )
        .catch((err) => reject(err));
    }),

    getClientById: (root, { id }) => new Promise((resolve, reject) => {
      Client.findById(id)
        .then(
          (client) => resolve(client)
        )
        .catch(
          (err) => reject(err)
        )
    }),

    getTopClientBySpends: (root) => new Promise((resolve, reject) => {
      Order.aggregate([
        {
          $match: { status: "COMPLEATED" }
        },
        {
          $group: {
            _id: "$clientId",
            totalSpend: { $sum: "$totalPrice" }
          }
        },
        {
          $lookup: {
            from: 'clients',
            localField: '_id',
            foreignField: '_id',
            as: 'clientInfo'
          }
        },
        {
          $sort: { totalSpend: -1 }
        },
        {
          $limit: 10
        }
      ], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      })
    }),

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
        filter = { stock: { $gt: 0 } }
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
          (product) => resolve(product)
        )
        .catch(
          (err) => reject(err)
        )
    }),

    // ORDERS
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
    }),

    // USERS
    getCurrentUser: (root, args, { userName }) => {
      if (!userName) { return null }
      const validUser = User.findOne({ userName })
      return validUser;
    }
  },

  Mutation: {
    // CLIENTS
    createClient: (root, { input }) => {
      const {
        firstName, lastName, company, emails, type, orders, age, creatorId,
      } = input;
      const newClient = new Client({
        firstName,
        lastName,
        company,
        emails,
        age,
        type,
        orders,
        creatorId,
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

    // PRODUCTS
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

    // ORDERS
    createOrder: (root, { input }) => {
      const {
        productsRequested,
        totalPrice,
        clientId,
      } = input;
      const newOrder = new Order({
        productsRequested,
        totalPrice,
        date: new Date(),
        clientId,
        status: "PENDING",
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
        case "COMPLEATED":
          instruction = '-';
          break;
        case "CANCELED":
          instruction = '+';
          break;
        default:
          break;
      }
      input.productsRequested.forEach((product) => {
        Product.updateOne({ _id: product.id }, {
          "$inc": {
            "stock": `${instruction}${product.amount}`
          }
        }, (err) => { if (err) return new Error(err) })
      });

      Order.findByIdAndUpdate(input.id, input, { new: true }, (err, data) => {
        if (err) { reject('MongoDB Err: ', err); } else { resolve('Order updated'); }
      });
    }),

    // USERS
    createUser: async (root, { input }) => {
      const { userName, password, role } = input;
      return new Promise((resolve, reject) => {
        User.findOne({ userName }, (err, data) => {
          if (err) return new Error(err)
          if (data) {
            resolve('Invalid User Name')
            return
          } else {
            const newUser = new User({
              userName,
              password,
              role,
            });
            newUser.id = newUser._id;
            newUser.save((err) => {
              if (err) {
                reject(err);
              } else {
                resolve("Creado correctamente")
              }
            })
          };
        })
      })
    },

    authenticateUser: async (root, { input }) => {
      const { userName, password } = input;
      const existingUser = await User.findOne({ userName });
      if (!existingUser) {
        console.log('No user with that name founded')
        return { message: 'No user with that name founded' };
      }
      const passwordsAreEqual = await bcrypt.compare(password, existingUser.password);
      if (!passwordsAreEqual) {
        console.log('Invalid password');
        return { message: 'Invalid password' };
      } else {
        console.log('Valid password');
        const token = createToken(existingUser.userName)
        return { token }
      }
    }
  }
};

export default resolvers;
