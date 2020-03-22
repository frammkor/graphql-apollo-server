import dotenv from 'dotenv';

dotenv.config();

//   endpoint: process.env.API_URL,
//   masterKey: process.env.API_KEY,
export const port = process.env.PORT;
export const dbURI = process.env.MONGODB_URI;

// module.exports = {
//   endpoint: process.env.API_URL,
//   masterKey: process.env.API_KEY,
//   port: process.env.PORT,
//   dbURI: process.env.MONGODB_URI,
// };
