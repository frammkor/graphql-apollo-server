import bcrypt from 'bcrypt';
import { User } from '../../../models';
import { createToken } from '../../../assets/auth';

const usersMutations = {
  createUser: async (root, { input }) => {
    const { userName, password, role } = input;
    return new Promise((resolve, reject) => {
      User.findOne({ userName }, (err, data) => {
        if (err) return new Error(err);
        if (data) {
          resolve({ status: 'ERROR', message: 'Invalid User Name' });
          return;
        }
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
            resolve({ status: 'SUCCESS', message: 'User registered correctly' });
          }
        });
      });
    });
  },

  authenticateUser: async (root, { input }) => {
    const { userName, password } = input;
    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return { message: 'No user with that name founded' };
    }
    const passwordsAreEqual = await bcrypt.compare(password, existingUser.password);
    if (!passwordsAreEqual) {
      return { message: 'Invalid password' };
    }
    const token = createToken(existingUser.userName);
    return { token };
  },
};

export default usersMutations;
