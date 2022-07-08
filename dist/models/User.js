"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoose = require('mongoose');

var connect = require('../config/database');

var uniqueValidator = require("mongoose-unique-validator");

var crypto = require('crypto');

var jwt = require('jsonwebtoken');

var secret = require('../config').secret;

var TypeUser = require('../models/TypeUser');

var userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    match: [/^[a-zA-Z]+$/, "es inválido, solo puede contener letras"]
  },
  lastname: {
    type: String,
    match: [/^[a-zA-Z_ ]+$/, "es inválido, solo puede contener letras"]
  },
  email: {
    type: String,
    required: [true, 'Se requiere un email valido'],
    unique: true,
    match: [/\S+@\S+\.\S+/, "es inválido"]
  },
  username: {
    type: String,
    index: true,
    required: [true, 'Se requiere un username valido'],
    unique: true,
    match: [/^[a-zA-Z0-9]+$/, "es inválido"]
  },
  id_type: {
    type: mongoose.Types.ObjectId,
    ref: "TypeUser",
    required: [true, 'Se debe indicar un tipo de usurio']
  },
  status: {
    type: Boolean,
    required: true,
    "default": true
  },
  hash: String,
  salt: String
}, {
  timestamps: true
});

userSchema.methods.createPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};

userSchema.methods.validationPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
  return this.hash === hash;
};

userSchema.methods.generateJWT = function () {
  var today = new Date();
  var exp = new Date();
  exp.setDate(today.getDate() + 60);
  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, secret);
};

userSchema.methods.toAuthJSON = function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    typeUser: this.id_type,
    token: this.generateJWT()
  };
};

userSchema.methods.typeUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id_type) {
    var typeUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connect();

          case 2:
            _context.next = 4;
            return TypeUser.findById(id_type);

          case 4:
            typeUser = _context.sent;
            return _context.abrupt("return", typeUser.type);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

userSchema.methods.updatePassword = function (password) {
  var salt = crypto.randomBytes(16).toString("hex");
  var hash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512").toString("hex");
  return [salt, hash];
};

userSchema.methods.publicData = function () {
  return {
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    username: this.username,
    status: this.status,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

userSchema.plugin(uniqueValidator, {
  message: "El email ya existe"
});
userSchema.plugin(uniqueValidator, {
  message: "El username ya existe"
});
module.exports = mongoose.model("User", userSchema);