import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import express from 'express';
import routes from './routes/route.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//config cors
app.use(cors());

console.log(process.env.MONGO_URI);
connectDB();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/api', routes);
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
