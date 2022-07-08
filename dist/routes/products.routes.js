"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _products = require("../controllers/products");

var auth = require('./auth.routes');

var router = (0, _express.Router)(); // Controllers

router.get('/', _products.showProducts);
router.get('/:id', _products.getProduct);
router.post('/', auth.requerido, _products.createProduct);
router.put('/:id', auth.requerido, _products.updateProduct);
router["delete"]('/:id', auth.requerido, _products.disableProduct);
router["delete"]('/', auth.requerido, _products.disableProducts);
var _default = router;
exports["default"] = _default;