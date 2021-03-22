const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
app.use(express.json());
const PORT = "3000" || process.env.PORT;

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: "myindianthingsDB",
});

const categoriesRouter = require("./routers/categories");
const productsRouter = require("./routers/products");

//routes
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.send("API is working fine !;");
});

app.listen(PORT, () => console.log("Server is running on port : " + PORT));
