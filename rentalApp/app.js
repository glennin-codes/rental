import express from "express";
import createError from "http-errors";
import logger from "morgan";
import router from "./routes/index.js";
import rateLimit from "express-rate-limit";
import cors from 'cors'
const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true}));
app.use(cors());

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs

});

app.use(limiter);
app.use("/api", router);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use((req, res, next) => {
  console.log(req.body); // Log the request body
  next(); // Proceed to the next middleware or route handler
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Send the error status
  res.status(err.status || 500);
  res.send(err.message);
});

export default app;
