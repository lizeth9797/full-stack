"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("../routes/index.routes"));

var _sectors = _interopRequireDefault(require("../routes/sectors.routes"));

var _categories = _interopRequireDefault(require("../routes/categories.routes"));

var _products = _interopRequireDefault(require("../routes/products.routes"));

var _users = _interopRequireDefault(require("../routes/users.routes"));

var _typesUsers = _interopRequireDefault(require("../routes/typesUsers.routes"));

var _periods = _interopRequireDefault(require("../routes/periods.routes"));

var _publications = _interopRequireDefault(require("../routes/publications.routes"));

var _rentails_requests = _interopRequireDefault(require("../routes/rentails_requests.routes"));

var _rents = _interopRequireDefault(require("../routes/rents.routes"));

var _swagger = _interopRequireDefault(require("../config/swagger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var swaggerUi = require("swagger-ui-express");

require('dotenv').config();

var server = (0, _express["default"])(); // Routes

// Settings
server.set("port", process.env.PORT || 4001); // Middleware

server.use(_express["default"].json()); // Configurar cabeceras y cors

server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
}); // Routes

server.use(_index["default"]);
server.use("/sectors", _sectors["default"]);
server.use("/categories", _categories["default"]);
server.use("/products", _products["default"]);
server.use("/users", _users["default"]);
server.use("/types-users", _typesUsers["default"]);
server.use("/periods", _periods["default"]);
server.use("/publications", _publications["default"]);
server.use("/rental-requests", _rentails_requests["default"]);
server.use("/rents", _rents["default"]);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(_swagger["default"]));
var _default = server;
exports["default"] = _default;