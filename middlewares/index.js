const authVerify = require("./authVerify.middleware");
const errorHandler = require("./errorHandler.middleware");
const routeNotFound = require("./routeNotFound.middleware");

module.exports = {
  authVerify,
  errorHandler,
  routeNotFound,
};
