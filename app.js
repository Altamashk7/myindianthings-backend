const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

const PORT = "3000" || process.env.PORT;

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: "myindianthingsDB",
});

app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

const categoriesRouter = require("./routers/categories");
const productsRouter = require("./routers/products");
const ordersRoutes = require("./routers/orders");
const reviewsRoutes = require("./routers/reviews");
const blogsRoutes = require("./routers/blogs");
//routes
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/blogs", blogsRoutes);

app.get("/", (req, res) => {
  res.send("API is working fine !");
});

app.listen(PORT, () => console.log("Server is running on port : " + PORT));
