import express from "express";
import dotenv from 'dotenv';
import contactRouter from "#routes/contact";
import indexRouter from "#routes/index";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/", indexRouter);
app.use("/contact", contactRouter);

app.listen(PORT, () => {
  console.log("Contact App Server successfully running on PORT", PORT);
});
