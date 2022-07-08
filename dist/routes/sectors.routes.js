"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _sectors = require("../controllers/sectors");

var auth = require('./auth.routes');

var router = (0, _express.Router)(); // Controllers

router.get('/', _sectors.showSectors);
router.get('/:id', _sectors.getSector);
router.post('/', auth.requerido, _sectors.createSector);
router.put('/:id', auth.requerido, _sectors.updateSector);
router["delete"]('/:id', auth.requerido, _sectors.disableSector);
router["delete"]('/', auth.requerido, _sectors.disableSectors);
var _default = router;
exports["default"] = _default;