const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
require("./db/db.connect");

const express = require("express");
const app = express();

const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("./routes/auth.router");
const categoryRouter = require("./routes/categories.router");
const productRouter = require("./routes/products.router");
const cartRouter = require("./routes/cart.router");
const wishlistRouter = require("./routes/wishlist.router");
const addressRouter = require("./routes/address.router");

const authVerify = require("./middlewares/authVerify.middleware");
const errorHandler = require("./middlewares/errorHandler.middleware");
const routeNotFound = require("./middlewares/routeNotFound.middleware");

app.use(cors());
app.use(helmet());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Welcome to Plantique!");
});

app.use("/auth", authRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/user/cart", authVerify, cartRouter);
app.use("/user/wishlist", authVerify, wishlistRouter);
app.use("/user/address", authVerify, addressRouter);

app.use(errorHandler);
app.use(routeNotFound);

app.listen(process.env.PORT, () => {
  console.log("Server started at port", process.env.PORT);
});
