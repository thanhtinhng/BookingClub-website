import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import express from 'express';
import noteRoutes from './routers/notesRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();
app.use(express.json());
app.use("/api/notes", noteRoutes);


app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(PORT, () => {
  console.log("Server is running on port",+ PORT);
});