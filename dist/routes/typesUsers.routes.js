"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _typesUsers = require("../controllers/typesUsers");

var auth = require('./auth.routes');

var router = (0, _express.Router)(); // Controllers

router.get('/', auth.requerido, _typesUsers.showTypesUsers);
router.get('/:id', auth.requerido, _typesUsers.getTypeUser);
router.post('/', auth.requerido, _typesUsers.createTypeUser);
router.put('/:id', auth.requerido, _typesUsers.updateTypeUser);
router["delete"]('/:id', auth.requerido, _typesUsers.disableTypeUser);
router["delete"]('/', auth.requerido, _typesUsers.disableTypesUsers);
var _default = router;
exports["default"] = _default;