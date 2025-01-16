import express from "express";
import config from "./config/config.js";
import { connectDB } from "./utils/connectDB.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import adminRoutes from "./routes/admin.routes.js"


const app = express();
const port = config.port

// Middlewares
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use((morgan("dev")))


// health check route
app.get('/api/v1/health', (req: any, res: any) => {
  res.send('Dr appointment app responds OK!');
});

// Routes
app.use("/api/v1/admin", adminRoutes);

// Error middleware 
app.use(errorMiddleware)

app.listen(port, () => {
  connectDB();
  console.log(`app listening on port ${port}`);
});