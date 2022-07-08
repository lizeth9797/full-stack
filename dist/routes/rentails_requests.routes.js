"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _rentail_requests = require("../controllers/rentail_requests");

var auth = require('./auth.routes');

var router = (0, _express.Router)(); // Controllers

router.get('/', _rentail_requests.showRentalRequests);
router.get('/:id', _rentail_requests.getRentalRequest);
router.post('/', auth.requerido, _rentail_requests.createRentalRequest);
router.put('/:id/:answer', auth.requerido, _rentail_requests.updateRentalRequest);
var _default = router;
exports["default"] = _default;