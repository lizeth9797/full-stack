"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _rents = require("../controllers/rents");

var router = (0, _express.Router)();

var auth = require('./auth.routes'); // Controllers


router.get('/', _rents.showRents);
router.get('/:id', _rents.getRent);
router.post('/', auth.requerido, _rents.createRent);
router.put('/:id/:update', auth.requerido, _rents.updateRent);
var _default = router;
exports["default"] = _default;