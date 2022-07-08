"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _periods = require("../controllers/periods");

var auth = require('./auth.routes');

var router = (0, _express.Router)(); // Controllers

router.get('/', _periods.showPeriods);
router.get('/:id', _periods.getPeriod);
router.post('/', auth.requerido, _periods.createPeriod);
router.put('/:id', auth.requerido, _periods.updatePeriod);
router["delete"]('/:id', auth.requerido, _periods.disablePeriod);
router["delete"]('/', auth.requerido, _periods.disablePeriods);
var _default = router;
exports["default"] = _default;