"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var connect = require('../config/database');

var Rent = require('../models/Rent');

var RentalRequest = require('../models/RentalRequest');

var Publication = require('../models/Publication');

var User = require('../models/User');

var Product = require('../models/Product');

function showRents(_x, _x2) {
  return _showRents.apply(this, arguments);
}

function _showRents() {
  _showRents = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connect();

          case 2:
            if (!req.query.id_lessee) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return Rent.aggregate([{
              '$lookup': {
                'from': 'rentalrequests',
                'localField': 'id_rentalRequest',
                'foreignField': '_id',
                'as': 'request'
              }
            }, {
              '$unwind': '$request'
            }, {
              '$lookup': {
                'from': 'publications',
                'localField': 'request.id_publication',
                'foreignField': '_id',
                'as': 'publication'
              }
            }, {
              '$unwind': '$publication'
            }, {
              '$lookup': {
                'from': 'products',
                'localField': 'publication.id_product',
                'foreignField': '_id',
                'as': 'product'
              }
            }, {
              '$unwind': '$product'
            }], function (err, rents) {
              if (err) {
                res.status(401).res.send(err);
              } else if (rents.length === 0) {
                res.send("No se han encontrado registros");
              } else {
                var result = [];
                rents.forEach(function (rent) {
                  if (rent.request.id_lessee == req.query.id_lessee) {
                    result.push(rent);
                  }
                });
                res.status(200).send(result);
              }
            });

          case 5:
            _context.next = 14;
            break;

          case 7:
            if (!req.query.id_lessor) {
              _context.next = 12;
              break;
            }

            _context.next = 10;
            return Rent.aggregate([{
              '$lookup': {
                'from': 'rentalrequests',
                'localField': 'id_rentalRequest',
                'foreignField': '_id',
                'as': 'request'
              }
            }, {
              '$unwind': '$request'
            }, {
              '$lookup': {
                'from': 'publications',
                'localField': 'request.id_publication',
                'foreignField': '_id',
                'as': 'publication'
              }
            }, {
              '$unwind': '$publication'
            }, {
              '$lookup': {
                'from': 'products',
                'localField': 'publication.id_product',
                'foreignField': '_id',
                'as': 'product'
              }
            }, {
              '$unwind': '$product'
            }], function (err, rents) {
              if (err) {
                res.status(401).res.send(err);
              } else if (rents.length === 0) {
                res.send("No se han encontrado registros");
              } else {
                var result = [];
                rents.forEach(function (rent) {
                  if (rent.request.id_lessor == req.query.id_lessor) {
                    result.push(rent);
                  }
                });
                res.status(200).send(result);
              }
            });

          case 10:
            _context.next = 14;
            break;

          case 12:
            _context.next = 14;
            return Rent.aggregate([{
              '$lookup': {
                'from': 'rentalrequests',
                'localField': 'id_rentalRequest',
                'foreignField': '_id',
                'as': 'request'
              }
            }, {
              '$unwind': '$request'
            }, {
              '$lookup': {
                'from': 'publications',
                'localField': 'request.id_publication',
                'foreignField': '_id',
                'as': 'publication'
              }
            }, {
              '$unwind': '$publication'
            }, {
              '$lookup': {
                'from': 'products',
                'localField': 'publication.id_product',
                'foreignField': '_id',
                'as': 'product'
              }
            }, {
              '$unwind': '$product'
            }], function (err, rents) {
              if (err) {
                res.status(401).res.send(err);
              } else if (rents.length === 0) {
                res.send("No se han encontrado registros");
              } else {
                res.status(200).send(rents);
              }
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _showRents.apply(this, arguments);
}

function createRent(_x3, _x4) {
  return _createRent.apply(this, arguments);
}

function _createRent() {
  _createRent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var rent, user, type, rentalRequest, publication, product;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            rent = new Rent(req.body);
            _context3.next = 3;
            return connect();

          case 3:
            _context3.next = 5;
            return User.findById(req.usuario.id);

          case 5:
            user = _context3.sent;
            _context3.next = 8;
            return user.typeUser(user.id_type);

          case 8:
            type = _context3.sent;

            if (!(type === 2 || type === 4 || type === 3)) {
              _context3.next = 27;
              break;
            }

            _context3.next = 12;
            return RentalRequest.findById(rent.id_rentalRequest, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 12:
            rentalRequest = _context3.sent;
            _context3.next = 15;
            return Publication.findById(rentalRequest.id_publication, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 15:
            publication = _context3.sent;
            _context3.next = 18;
            return Product.findById(publication.id_product, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 18:
            product = _context3.sent;

            if (!(product.id_lessor != user.id)) {
              _context3.next = 23;
              break;
            }

            res.status(401).send("Permisos insuficientes");
            _context3.next = 25;
            break;

          case 23:
            _context3.next = 25;
            return rent.save( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err) {
                var _rentalRequest;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!err) {
                          _context2.next = 4;
                          break;
                        }

                        res.status(400).json({
                          success: false,
                          type: err.title,
                          error: err.message
                        });
                        _context2.next = 14;
                        break;

                      case 4:
                        _context2.next = 6;
                        return RentalRequest.findById(rent.id_rentalRequest);

                      case 6:
                        _rentalRequest = _context2.sent;

                        if (_rentalRequest) {
                          _context2.next = 11;
                          break;
                        }

                        res.status(401).send("No se ha encontrado el registro de la solicitud de renta");
                        _context2.next = 14;
                        break;

                      case 11:
                        _context2.next = 13;
                        return RentalRequest.findByIdAndUpdate(rent.id_rentalRequest, {
                          answer: {
                            "status": "Confirmada",
                            "ref": 2
                          }
                        });

                      case 13:
                        res.status(200).json({
                          message: 'Solicitud de Renta Actualizada con Exito',
                          success: "Renta creada con Exito",
                          RentalRequest: _rentalRequest.answer,
                          Rent: rent
                        });

                      case 14:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x9) {
                return _ref.apply(this, arguments);
              };
            }());

          case 25:
            _context3.next = 28;
            break;

          case 27:
            res.status(401).send("Permisos insuficientes");

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _createRent.apply(this, arguments);
}

function getRent(_x5, _x6) {
  return _getRent.apply(this, arguments);
}

function _getRent() {
  _getRent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var rent;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return connect();

          case 2:
            _context4.prev = 2;
            _context4.next = 5;
            return Rent.findById(req.params.id);

          case 5:
            rent = _context4.sent;

            if (!rent) {
              res.status(204).send("No se han encontrado registros");
            } else {
              res.status(200).send(rent);
            }

            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](2);
            res.status(400).send(_context4.t0);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 9]]);
  }));
  return _getRent.apply(this, arguments);
}

function updateRent(_x7, _x8) {
  return _updateRent.apply(this, arguments);
} // exportamos las funciones definidas


function _updateRent() {
  _updateRent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var user, type, rent, rentalRequest, publication, product;
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

            if (!(type === 2 || type === 4 || type === 3)) {
              _context5.next = 45;
              break;
            }

            _context5.next = 11;
            return Rent.findById(req.params.id, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 11:
            rent = _context5.sent;
            _context5.next = 14;
            return RentalRequest.findById(rent.id_rentalRequest, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 14:
            rentalRequest = _context5.sent;
            _context5.next = 17;
            return Publication.findById(rentalRequest.id_publication, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 17:
            publication = _context5.sent;
            _context5.next = 20;
            return Product.findById(publication.id_product, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 20:
            product = _context5.sent;

            if (rent) {
              _context5.next = 25;
              break;
            }

            res.status(401).send("No se han encontrado el registro");
            _context5.next = 43;
            break;

          case 25:
            if (!(product.id_lessor != user.id)) {
              _context5.next = 29;
              break;
            }

            res.status(401).send("Permisos insuficientes");
            _context5.next = 43;
            break;

          case 29:
            if (!(req.params.update == 2)) {
              _context5.next = 34;
              break;
            }

            _context5.next = 32;
            return Rent.findByIdAndUpdate(req.params.id, {
              status: {
                "status": "Finalizada",
                "ref": 2
              }
            });

          case 32:
            _context5.next = 42;
            break;

          case 34:
            if (!(req.params.update == 3)) {
              _context5.next = 39;
              break;
            }

            _context5.next = 37;
            return Rent.findByIdAndUpdate(req.params.id, {
              status: {
                "status": "Cancelada",
                "ref": 2
              }
            });

          case 37:
            _context5.next = 42;
            break;

          case 39:
            if (!(req.params.update == 4)) {
              _context5.next = 42;
              break;
            }

            _context5.next = 42;
            return Rent.findByIdAndUpdate(req.params.id, {
              payment: true
            });

          case 42:
            res.status(200).json({
              message: 'Solicitud de Renta Actualizada con Exito'
            });

          case 43:
            _context5.next = 46;
            break;

          case 45:
            res.status(401).send("Permisos insuficientes");

          case 46:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _updateRent.apply(this, arguments);
}

module.exports = {
  createRent: createRent,
  showRents: showRents,
  getRent: getRent,
  updateRent: updateRent
};