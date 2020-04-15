import jwt from 'jsonwebtoken';
import { tokenGen } from '../config/env';

export const createToken = (userName) => {
  return jwt.sign({ userName }, tokenGen, { expiresIn: '1hr' });
}

export const verifyToken = (tokenFromClient) => {
  return jwt.verify(tokenFromClient, tokenGen);
}