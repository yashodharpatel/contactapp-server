import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import contactRouter from "#routes/contact";
import indexRouter from "#routes/index";
import errorHandler from "#middleware/errorHandler";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(morgan('dev'));

app.use("/", indexRouter);
app.use("/contact", contactRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Contact App Server successfully running on PORT", PORT);
});