"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var connect = require('../config/database');

var TypeUser = require('../models/TypeUser');

var User = require('../models/User');

function showTypesUsers(_x, _x2) {
  return _showTypesUsers.apply(this, arguments);
}

function _showTypesUsers() {
  _showTypesUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, type;
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
                  type: 1,
                  createdAt: 1,
                  status: 1,
                  updatedAt: 1
                };
              }
            }

            _context.next = 5;
            return User.findById(req.usuario.id);

          case 5:
            user = _context.sent;
            _context.next = 8;
            return user.typeUser(user.id_type);

          case 8:
            type = _context.sent;

            if (!(type === 1)) {
              _context.next = 19;
              break;
            }

            if (!req.query.name) {
              _context.next = 15;
              break;
            }

            _context.next = 13;
            return TypeUser.aggregate([{
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
            }], function (err, typesUsers) {
              if (err) {
                res.status(401).send(err);
              } else if (typesUsers.length > 0) {
                res.status(200).send(typesUsers);
              } else {
                res.status(204).send("No se han encontrado registros");
              }
            });

          case 13:
            _context.next = 17;
            break;

          case 15:
            _context.next = 17;
            return TypeUser.aggregate([{
              '$project': req.body.require
            }, {
              '$limit': req.body.limit
            }], function (err, typesUsers) {
              if (err) {
                res.status(401).send(err);
              } else if (typesUsers.length > 0) {
                res.status(200).send(typesUsers);
              } else {
                res.status(204).send("No se han encontrado registros");
              }
            });

          case 17:
            _context.next = 20;
            break;

          case 19:
            res.status(401).send("Permisos insuficientes");

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _showTypesUsers.apply(this, arguments);
}

function createTypeUser(_x3, _x4) {
  return _createTypeUser.apply(this, arguments);
}

function _createTypeUser() {
  _createTypeUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var typeUser, user, type;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            typeUser = new TypeUser(req.body);
            _context2.next = 3;
            return User.findById(req.usuario.id);

          case 3:
            user = _context2.sent;
            _context2.next = 6;
            return user.typeUser(user.id_type);

          case 6:
            type = _context2.sent;

            if (!(type === 1)) {
              _context2.next = 12;
              break;
            }

            _context2.next = 10;
            return typeUser.save(function (err) {
              if (err) {
                res.status(400).json({
                  success: false,
                  type: err.name,
                  error: err.message
                });
              } else {
                res.status(201).json({
                  success: "Tipo de Usuario creado con Exito",
                  typeUser: typeUser
                });
              }
            });

          case 10:
            _context2.next = 13;
            break;

          case 12:
            res.status(401).send("Permisos insuficientes");

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createTypeUser.apply(this, arguments);
}

function getTypeUser(_x5, _x6) {
  return _getTypeUser.apply(this, arguments);
}

function _getTypeUser() {
  _getTypeUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user, type, typeUser;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return connect();

          case 2:
            _context3.next = 4;
            return User.findById(req.usuario.id);

          case 4:
            user = _context3.sent;
            _context3.next = 7;
            return user.typeUser(user.id_type);

          case 7:
            type = _context3.sent;

            if (!(type === 1)) {
              _context3.next = 21;
              break;
            }

            _context3.prev = 9;
            _context3.next = 12;
            return TypeUser.findById(req.params.id);

          case 12:
            typeUser = _context3.sent;

            if (!typeUser) {
              res.status(204).send("No se han encontrado registros");
            } else {
              res.status(200).send(typeUser);
            }

            _context3.next = 19;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](9);
            res.status(400).send(_context3.t0);

          case 19:
            _context3.next = 22;
            break;

          case 21:
            res.status(401).send("Permisos insuficientes");

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[9, 16]]);
  }));
  return _getTypeUser.apply(this, arguments);
}

function updateTypeUser(_x7, _x8) {
  return _updateTypeUser.apply(this, arguments);
}

function _updateTypeUser() {
  _updateTypeUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var user, type, typeUser;
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
            return TypeUser.findById(req.params.id, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 11:
            typeUser = _context4.sent;

            if (typeUser) {
              _context4.next = 16;
              break;
            }

            res.status(401).send("No se han encontrado el registro");
            _context4.next = 19;
            break;

          case 16:
            _context4.next = 18;
            return TypeUser.findByIdAndUpdate(req.params.id, {
              $set: req.body
            });

          case 18:
            res.status(200).send({
              message: 'Tipo de Usuario Actualizado con Exito'
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
  return _updateTypeUser.apply(this, arguments);
}

function disableTypeUser(_x9, _x10) {
  return _disableTypeUser.apply(this, arguments);
}

function _disableTypeUser() {
  _disableTypeUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var user, type, typeUser;
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
            return TypeUser.findById(req.params.id, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 11:
            typeUser = _context5.sent;

            if (typeUser) {
              _context5.next = 16;
              break;
            }

            res.status(401).send("No se han encontrado el registro");
            _context5.next = 19;
            break;

          case 16:
            _context5.next = 18;
            return TypeUser.findByIdAndUpdate(req.params.id, {
              "status": false
            });

          case 18:
            res.status(200).send({
              message: 'Tipo de Usuario Deshabilitado con Exito'
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
  return _disableTypeUser.apply(this, arguments);
}

function disableTypesUsers(_x11, _x12) {
  return _disableTypesUsers.apply(this, arguments);
} // exportamos las funciones definidas


function _disableTypesUsers() {
  _disableTypesUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var user, type;
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
              _context6.next = 13;
              break;
            }

            _context6.next = 11;
            return TypeUser.updateMany({
              "status": false
            }, function (err, typesUsers) {
              if (err) {
                res.status(401).send("No se han encontrado el registros");
              } else {
                res.status(200).send({
                  message: 'Tipos de Usuarios Deshabilitados con Exito'
                });
              }
            });

          case 11:
            _context6.next = 14;
            break;

          case 13:
            res.status(401).send("Permisos insuficientes");

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _disableTypesUsers.apply(this, arguments);
}

module.exports = {
  createTypeUser: createTypeUser,
  showTypesUsers: showTypesUsers,
  getTypeUser: getTypeUser,
  disableTypeUser: disableTypeUser,
  updateTypeUser: updateTypeUser,
  disableTypesUsers: disableTypesUsers
};