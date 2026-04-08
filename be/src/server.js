import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
console.log(process.env.MONGO_URI);
connectDB();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});