import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import express from 'express';
import routes from './routes/route.js';
import paymentRouter from './routes/payment.route.js';
import cors from 'cors';
import sportComplexRouter from './routes/sport_complex.route.js';
import cookieParser from "cookie-parser";
import { cancelExpiredBookings } from './services/payment.service.js';
import subFieldRouter from './routes/subfield.route.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//config cors
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(",") || [];

app.use(
  cors({
    origin(origin, callback) {
      // Cho phép request không có origin (Postman, curl)
      if (!origin) {
        return callback(null, true);
      }

      // Nếu nằm trong whitelist
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Nếu không hợp lệ → reject
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

console.log(process.env.MONGO_URI);
connectDB();
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api/v1', routes);
app.use('/api/v1', paymentRouter);
app.use('/api/v1/sportcomplex', sportComplexRouter);
app.use('/api/v1/subfield', subFieldRouter);


app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

setInterval(async () => {
  try {
    await cancelExpiredBookings();
  } catch (err) {
    console.error(err);
  }
}, 60 * 1000);
