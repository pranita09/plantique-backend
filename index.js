const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
require("./db/db.connect");

const {
  seedCategoriesDatabase,
} = require("./controllers/categories.controller");
const { seedProductsDatabase } = require("./controllers/products.controller");
const { seedUsersDatabase } = require("./controllers/users.controller");

// seedCategoriesDatabase();
// seedProductsDatabase();
// seedUsersDatabase();
