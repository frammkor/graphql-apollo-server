import jwt from 'jsonwebtoken';
import { tokenGen } from '../config/env';

export const createToken = (userName) => jwt.sign({ userName }, tokenGen, { expiresIn: '1hr' });

export const verifyToken = (tokenFromClient) => jwt.verify(tokenFromClient, tokenGen);
