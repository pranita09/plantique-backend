const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
require("./db/db.connect");

const express = require("express");
const app = express();

const cors = require("cors");
const helmet = require("helmet");

const {
  authRouter,
  categoryRouter,
  productRouter,
  cartRouter,
  wishlistRouter,
  addressRouter,
} = require("./routes/index");

const {
  authVerify,
  errorHandler,
  routeNotFound,
} = require("./middlewares/index");

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
