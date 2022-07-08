"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoose = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;

var connect = require('../config/database');

var Category = require('../models/Category');

var User = require('../models/User');

function showCategories(_x, _x2) {
  return _showCategories.apply(this, arguments);
}

function _showCategories() {
  _showCategories = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connect();

          case 2:
            if (req.body.require || req.body.limit) {
              if (!req.body.limit) {
                req.body.limit = Infinity;
              } else if (!req.body.require) {
                req.body.require = {
                  _id: 1,
                  name: 1,
                  id_sector: 1,
                  description: 1,
                  createdAt: 1,
                  status: 1,
                  updatedAt: 1
                };
              }
            } else {
              req.body.require = {
                _id: 1,
                name: 1,
                id_sector: 1,
                description: 1,
                createdAt: 1,
                status: 1,
                updatedAt: 1
              };
              req.body.limit = Infinity;
            }

            if (!req.query.name) {
              _context.next = 8;
              break;
            }

            _context.next = 6;
            return Category.aggregate([{
              '$project': req.body.require
            }, {
              '$limit': req.body.limit
            }, {
              '$match': {
                "name": {
                  $regex: req.query.name,
                  $options: "$i"
                }
              }
            }], function (err, categories) {
              if (err) {
                res.status(401).send(err);
              } else if (categories.length > 0) {
                res.status(200).send(categories);
              } else {
                res.status(404).send("No se han encontrado registros");
              }
            });

          case 6:
            _context.next = 10;
            break;

          case 8:
            _context.next = 10;
            return Category.aggregate([{
              '$project': req.body.require
            }, {
              '$limit': req.body.limit
            }], function (err, categories) {
              if (err) {
                res.status(401).send(err);
              } else if (categories.length > 0) {
                res.status(200).send(categories);
              } else {
                res.status(404).send("No se han encontrado registros");
              }
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _showCategories.apply(this, arguments);
}

function createCategory(_x3, _x4) {
  return _createCategory.apply(this, arguments);
}

function _createCategory() {
  _createCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var category, user, type;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            category = new Category(req.body);
            _context2.next = 3;
            return connect();

          case 3:
            _context2.next = 5;
            return User.findById(req.usuario.id);

          case 5:
            user = _context2.sent;
            _context2.next = 8;
            return user.typeUser(user.id_type);

          case 8:
            type = _context2.sent;

            if (!(type === 1)) {
              _context2.next = 14;
              break;
            }

            _context2.next = 12;
            return category.save(function (err) {
              if (err) {
                res.status(400).json({
                  success: false,
                  type: err.name,
                  error: err.message
                });
              } else {
                res.status(201).json({
                  success: "Categoria creada con Exito",
                  category: category
                });
              }
            });

          case 12:
            _context2.next = 15;
            break;

          case 14:
            res.status(401).send("Permisos insuficientes");

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createCategory.apply(this, arguments);
}

function getCategory(_x5, _x6) {
  return _getCategory.apply(this, arguments);
}

function _getCategory() {
  _getCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var category;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return connect();

          case 2:
            _context3.prev = 2;
            _context3.next = 5;
            return Category.findById(req.params.id);

          case 5:
            category = _context3.sent;

            if (!category) {
              res.status(204).send("No se han encontrado registros");
            } else {
              res.status(200).send(category);
            }

            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](2);
            res.status(400).send(_context3.t0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 9]]);
  }));
  return _getCategory.apply(this, arguments);
}

function updateCategory(_x7, _x8) {
  return _updateCategory.apply(this, arguments);
}

function _updateCategory() {
  _updateCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var user, type, category;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return connect();

          case 2:
            _context4.next = 4;
            return User.findById(req.usuario.id);

          case 4:
            user = _context4.sent;
            _context4.next = 7;
            return user.typeUser(user.id_type);

          case 7:
            type = _context4.sent;

            if (!(type === 1)) {
              _context4.next = 21;
              break;
            }

            _context4.next = 11;
            return Category.findById(req.params.id, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 11:
            category = _context4.sent;

            if (category) {
              _context4.next = 16;
              break;
            }

            res.status(401).send("No se han encontrado el registro");
            _context4.next = 19;
            break;

          case 16:
            _context4.next = 18;
            return Category.findByIdAndUpdate(req.params.id, {
              $set: req.body
            });

          case 18:
            res.status(200).send({
              message: 'Categoria Actualizada con Exito'
            });

          case 19:
            _context4.next = 22;
            break;

          case 21:
            res.status(401).send("Permisos insuficientes");

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _updateCategory.apply(this, arguments);
}

function disableCategory(_x9, _x10) {
  return _disableCategory.apply(this, arguments);
}

function _disableCategory() {
  _disableCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var user, type, category;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return connect();

          case 2:
            _context5.next = 4;
            return User.findById(req.usuario.id);

          case 4:
            user = _context5.sent;
            _context5.next = 7;
            return user.typeUser(user.id_type);

          case 7:
            type = _context5.sent;

            if (!(type === 1)) {
              _context5.next = 21;
              break;
            }

            _context5.next = 11;
            return Category.findById(req.params.id, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 11:
            category = _context5.sent;

            if (category) {
              _context5.next = 16;
              break;
            }

            res.status(401).send("No se han encontrado el registro");
            _context5.next = 19;
            break;

          case 16:
            _context5.next = 18;
            return Category.findByIdAndUpdate(req.params.id, {
              $set: req.body
            });

          case 18:
            res.status(200).send({
              message: 'Categoria Deshabilitada con Exito'
            });

          case 19:
            _context5.next = 22;
            break;

          case 21:
            res.status(401).send("Permisos insuficientes");

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _disableCategory.apply(this, arguments);
}

function disableCategories(_x11, _x12) {
  return _disableCategories.apply(this, arguments);
} // exportamos las funciones definidas


function _disableCategories() {
  _disableCategories = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var user, type, category;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return connect();

          case 2:
            _context6.next = 4;
            return User.findById(req.usuario.id);

          case 4:
            user = _context6.sent;
            _context6.next = 7;
            return user.typeUser(user.id_type);

          case 7:
            type = _context6.sent;

            if (!(type === 1)) {
              _context6.next = 14;
              break;
            }

            _context6.next = 11;
            return Category.updateMany({
              "status": false
            }, function (err, categories) {
              if (err) {
                res.status(401).send("No se han encontrado el registros");
              } else {
                res.status(200).send({
                  message: 'Categorias Deshabilitados con Exito'
                });
              }
            });

          case 11:
            category = _context6.sent;
            _context6.next = 15;
            break;

          case 14:
            res.status(401).send("Permisos insuficientes");

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _disableCategories.apply(this, arguments);
}

module.exports = {
  createCategory: createCategory,
  showCategories: showCategories,
  getCategory: getCategory,
  disableCategory: disableCategory,
  updateCategory: updateCategory,
  disableCategories: disableCategories
};