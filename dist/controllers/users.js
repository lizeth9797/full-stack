"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var connect = require("../config/database");

var User = require("../models/User");

var passport = require("passport");

function showUsers(_x, _x2) {
  return _showUsers.apply(this, arguments);
}

function _showUsers() {
  _showUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
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
                  firstname: 1,
                  lastname: 1,
                  email: 1,
                  username: 1,
                  status: 1,
                  createdAt: 1,
                  updatedAt: 1
                };
              }
            } else {
              req.body.require = {
                firstname: 1,
                lastname: 1,
                email: 1,
                username: 1,
                status: 1,
                createdAt: 1,
                updatedAt: 1
              };
              req.body.limit = Infinity;
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
              _context.next = 29;
              break;
            }

            if (!req.query.firstname) {
              _context.next = 15;
              break;
            }

            _context.next = 13;
            return User.aggregate([{
              $project: req.body.require
            }, {
              $limit: req.body.limit
            }, {
              $match: {
                firstname: {
                  $regex: req.query.firstname,
                  $options: "$i"
                }
              }
            }], function (err, users) {
              if (err) {
                res.status(401).send(err);
              } else if (users.length > 0) {
                res.status(200).send(users);
              } else {
                res.status(204).send("No se han encontrado registros");
              }
            });

          case 13:
            _context.next = 27;
            break;

          case 15:
            if (!req.query.lastname) {
              _context.next = 20;
              break;
            }

            _context.next = 18;
            return User.aggregate([{
              $project: req.body.require
            }, {
              $limit: req.body.limit
            }, {
              $match: {
                lastname: {
                  $regex: req.query.lastname,
                  $options: "$i"
                }
              }
            }], function (err, users) {
              if (err) {
                res.status(401).send(err);
              } else if (users.length > 0) {
                res.status(200).send(users);
              } else {
                res.status(204).send("No se han encontrado registros");
              }
            });

          case 18:
            _context.next = 27;
            break;

          case 20:
            if (!req.query.username) {
              _context.next = 25;
              break;
            }

            _context.next = 23;
            return User.aggregate([{
              $project: req.body.require
            }, {
              $limit: req.body.limit
            }, {
              $match: {
                username: {
                  $regex: req.query.username,
                  $options: "$i"
                }
              }
            }], function (err, users) {
              if (err) {
                res.status(401).send(err);
              } else if (users.length > 0) {
                res.status(200).send(users);
              } else {
                res.status(204).send("No se han encontrado registros");
              }
            });

          case 23:
            _context.next = 27;
            break;

          case 25:
            _context.next = 27;
            return User.aggregate([{
              $project: req.body.require
            }, {
              $limit: req.body.limit
            }], function (err, users) {
              if (err) {
                res.status(401).send(err);
              } else if (users.length > 0) {
                res.status(200).send(users);
              } else {
                res.status(204).send("No se han encontrado registros");
              }
            });

          case 27:
            _context.next = 30;
            break;

          case 29:
            res.status(401).send("Permisos insuficientes");

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _showUsers.apply(this, arguments);
}

function createUser(_x3, _x4) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var body, password, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = req.body, password = body.password;
            delete body.password;
            user = new User(body);
            user.createPassword(password);
            _context2.next = 6;
            return connect();

          case 6:
            _context2.next = 8;
            return user.save(function (err) {
              if (err) {
                res.status(400).json({
                  success: false,
                  type: err.name,
                  error: err.message
                });
              } else {
                res.status(201).json(user.toAuthJSON());
              }
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createUser.apply(this, arguments);
}

function login(_x5, _x6, _x7) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (req.body.email) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", res.status(422).json({
              errors: {
                email: "no puede estar vacío"
              }
            }));

          case 2:
            if (req.body.password) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", res.status(422).json({
              errors: {
                password: "no puede estar vacío"
              }
            }));

          case 4:
            passport.authenticate("local", {
              session: false
            }, function (err, user, info) {
              if (err) {
                return next(err);
              }

              if (user) {
                user.token = user.generateJWT();
                return res.json({
                  user: user.toAuthJSON()
                });
              } else {
                return res.status(422).json(info);
              }
            })(req, res, next);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _login.apply(this, arguments);
}

function getUser(_x8, _x9) {
  return _getUser.apply(this, arguments);
}

function _getUser() {
  _getUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var user, type, userSearch;
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
            _context4.next = 10;
            return User.findById(req.params.id);

          case 10:
            userSearch = _context4.sent;

            if (!user) {
              res.status(204).send("No se han encontrado registros");
            } else {
              if (type === 1) {
                res.status(200).send(userSearch.publicData());
              } else if (user.id == userSearch._id) {
                res.status(200).send(userSearch.publicData());
              } else {
                res.status(401).send("Permisos insuficientes");
              }
            }

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getUser.apply(this, arguments);
}

function updateUser(_x10, _x11) {
  return _updateUser.apply(this, arguments);
}

function _updateUser() {
  _updateUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var user, type, userSearch, passwordNew;
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
            _context5.next = 10;
            return User.findById(req.params.id);

          case 10:
            userSearch = _context5.sent;

            if (user) {
              _context5.next = 15;
              break;
            }

            res.status(204).send("No se han encontrado registros");
            _context5.next = 37;
            break;

          case 15:
            if (!(type === 2)) {
              _context5.next = 21;
              break;
            }

            _context5.next = 18;
            return User.findByIdAndUpdate(req.params.id, {
              $set: req.body
            });

          case 18:
            res.status(200).send({
              message: "Usuario Actualizado con Exito"
            });
            _context5.next = 37;
            break;

          case 21:
            if (!(user.id == userSearch._id)) {
              _context5.next = 36;
              break;
            }

            if (!req.body.password_new) {
              _context5.next = 31;
              break;
            }

            if (!userSearch.validationPassword(req.body.password_current)) {
              _context5.next = 30;
              break;
            }

            passwordNew = userSearch.updatePassword(req.body.password_new);
            delete req.body.password;
            req.body.salt = passwordNew[0];
            req.body.hash = passwordNew[1];
            _context5.next = 31;
            break;

          case 30:
            return _context5.abrupt("return", res.status(400).send("La contraseña actual es incorrecta"));

          case 31:
            _context5.next = 33;
            return User.findByIdAndUpdate(req.params.id, {
              $set: req.body
            });

          case 33:
            res.status(200).send({
              message: "Usuario Actualizado con Exito"
            });
            _context5.next = 37;
            break;

          case 36:
            res.status(401).send("Permisos insuficientes");

          case 37:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _updateUser.apply(this, arguments);
}

function disableUser(_x12, _x13) {
  return _disableUser.apply(this, arguments);
}

function _disableUser() {
  _disableUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var user, type, _user;

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
              _context6.next = 21;
              break;
            }

            _context6.next = 11;
            return User.findById(req.params.id, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 11:
            _user = _context6.sent;

            if (_user) {
              _context6.next = 16;
              break;
            }

            res.status(401).send("No se han encontrado el registro");
            _context6.next = 19;
            break;

          case 16:
            _context6.next = 18;
            return User.findByIdAndUpdate(req.params.id, {
              status: false
            });

          case 18:
            res.status(200).send({
              message: "Usuario Deshabilitado con Exito"
            });

          case 19:
            _context6.next = 22;
            break;

          case 21:
            res.status(401).send("Permisos insuficientes");

          case 22:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _disableUser.apply(this, arguments);
}

function disableUsers(_x14, _x15) {
  return _disableUsers.apply(this, arguments);
} // exportamos las funciones definidas


function _disableUsers() {
  _disableUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var user, type;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return connect();

          case 2:
            _context7.next = 4;
            return User.findById(req.usuario.id);

          case 4:
            user = _context7.sent;
            _context7.next = 7;
            return user.typeUser(user.id_type);

          case 7:
            type = _context7.sent;

            if (!(type === 1)) {
              _context7.next = 13;
              break;
            }

            _context7.next = 11;
            return User.updateMany({
              status: false
            }, function (err, users) {
              if (err) {
                res.status(401).send("No se han encontrado el registros");
              } else {
                res.status(200).send({
                  message: "Usuarios Deshabilitados con Exito"
                });
              }
            });

          case 11:
            _context7.next = 14;
            break;

          case 13:
            res.status(401).send("Permisos insuficientes");

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _disableUsers.apply(this, arguments);
}

module.exports = {
  createUser: createUser,
  showUsers: showUsers,
  getUser: getUser,
  disableUser: disableUser,
  updateUser: updateUser,
  disableUsers: disableUsers,
  login: login
};