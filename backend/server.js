// To use import here (ES) instead of = require() [common JS]
// I added "type" : "module" to root package.json
// ... now also have to put .js at the end of files
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";

// pull env variables
dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

// ----------- Middleware for custom error handlers -----------
// handle 404s
app.use(notFound);
// handle server errors
app.use(errorHandler);
// ------------------------------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(
  5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold
  )
);
