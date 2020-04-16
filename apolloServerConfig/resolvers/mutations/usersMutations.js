import { User } from '../../../models';
import { createToken } from '../../../assets/auth';
import bcrypt from 'bcrypt'

const usersMutations = {
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
  },
}

export default usersMutations;