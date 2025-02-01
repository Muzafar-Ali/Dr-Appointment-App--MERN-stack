import express from "express";
import config from "./config/config.js";
import { connectDB } from "./utils/connectDB.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from 'cors';
import adminRoutes from "./routes/admin.routes.js"
import userRoutes from "./routes/user.routes.js"
import doctorRoutes from "./routes/doctor.routes.js"


const app = express();
const port = config.port

// app.use(cors({
//   origin: `${config.corsOrigin}`,
//   credentials: true
// }));

// Enable CORS with dynamic origin check
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || config.corsOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true  // Allow cookies/session data
}));

// Middlewares
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use((morgan("dev")))

// Routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/doctor", doctorRoutes);

// Error middleware 
app.use(errorMiddleware)

app.listen(port, () => {
  connectDB();
  console.log(`app listening on port ${port}`);
});