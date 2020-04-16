import { User } from '../../../models';

const usersQueries = {
  getCurrentUser: (root, args, { userName }) => {
    if (!userName) { return null }
    const validUser = User.findOne({ userName })
    return validUser;
  }
}

export default usersQueries;