import dotenv from 'dotenv';
dotenv.config();
module.exports = {
    //   endpoint: process.env.API_URL,
    //   masterKey: process.env.API_KEY,
    port: process.env.PORT,
    dbURI: process.env.MONGODB_URI
};
