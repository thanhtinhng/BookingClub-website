import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import express from 'express';
const app = express();
const PORT = process.env.PORT || 5001;
dotenv.config();
connectDB();
console.log(process.env.MONGO_URI);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(PORT, () => {
  console.log("Server is running on port",+ PORT);
});