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

app.use(cors({
  origin: `${config.corsOrigin}`,
  credentials: true
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