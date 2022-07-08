"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _users = require("../controllers/users");

var auth = require('./auth.routes');

var router = (0, _express.Router)(); // Controllers

router.get('/', auth.requerido, _users.showUsers);
router.get('/:id', auth.requerido, _users.getUser);
router.post('/', _users.createUser);
router.post('/login', _users.login);
router.put('/:id', auth.requerido, _users.updateUser);
router["delete"]('/:id', auth.requerido, _users.disableUser);
router["delete"]('/', auth.requerido, _users.disableUsers);
var _default = router;
exports["default"] = _default;