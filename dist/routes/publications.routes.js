"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _publications = require("../controllers/publications");

var router = (0, _express.Router)();

var auth = require('./auth.routes'); // Controllers


router.get('/', _publications.showPublications);
router.get('/:id', _publications.getPublication);
router.post('/', auth.requerido, _publications.createPublication);
router.put('/:id', auth.requerido, _publications.updatePublication);
router["delete"]('/:id', auth.requerido, _publications.disablePublication);
router["delete"]('/', auth.requerido, _publications.disablePublications);
var _default = router;
exports["default"] = _default;