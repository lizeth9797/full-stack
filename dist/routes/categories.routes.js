"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _categories = require("../controllers/categories");

var auth = require('./auth.routes');

var router = (0, _express.Router)(); // Controllers

router.get('/', _categories.showCategories);
router.get('/:id', _categories.getCategory);
router.post('/', auth.requerido, _categories.createCategory);
router.put('/:id', auth.requerido, _categories.updateCategory);
router["delete"]('/:id', auth.requerido, _categories.disableCategory);
router["delete"]('/', auth.requerido, _categories.disableCategories);
var _default = router;
exports["default"] = _default;