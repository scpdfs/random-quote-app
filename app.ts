import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan"
import quoteRoutes from "./routes/quote.route";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

app.use("/api", quoteRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

export default app;
