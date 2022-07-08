"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var connect = require('../config/database');

var RentalRequest = require('../models/RentalRequest');

var Publication = require('../models/Publication');

var User = require('../models/User');

var Product = require('../models/Product');

function showRentalRequests(_x, _x2) {
  return _showRentalRequests.apply(this, arguments);
}

function _showRentalRequests() {
  _showRentalRequests = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
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
            return RentalRequest.aggregate([{
              '$lookup': {
                'from': 'publications',
                'localField': 'id_publication',
                'foreignField': '_id',
                'as': 'publication'
              }
            }], function (err, rentalRequests) {
              var search = rentalRequests.filter(function (request) {
                if (request.id_lessee == req.query.id_lessee) {
                  return request;
                }
              });

              if (err) {
                res.status(401).send(err);
              } else if (search.length > 0) {
                res.status(200).send(search);
              } else {
                res.status(404).send("No se han encontrado registros");
              }
            });

          case 5:
            _context.next = 19;
            break;

          case 7:
            if (!req.query.id_lessor) {
              _context.next = 12;
              break;
            }

            _context.next = 10;
            return RentalRequest.aggregate([{
              '$lookup': {
                'from': 'publications',
                'localField': 'id_publication',
                'foreignField': '_id',
                'as': 'publication'
              }
            }], function (err, rentalRequests) {
              var search = rentalRequests.filter(function (request) {
                if (request.id_lessor == req.query.id_lessor) {
                  return request;
                }
              });

              if (err) {
                res.status(401).send(err);
              } else if (search.length > 0) {
                res.status(200).send(search);
              } else {
                res.status(404).send("No se han encontrado registros");
              }
            });

          case 10:
            _context.next = 19;
            break;

          case 12:
            if (!req.query.id_publication) {
              _context.next = 17;
              break;
            }

            _context.next = 15;
            return RentalRequest.aggregate([{
              '$lookup': {
                'from': 'publications',
                'localField': 'id_publication',
                'foreignField': '_id',
                'as': 'publication'
              }
            }], function (err, rentalRequests) {
              var search = rentalRequests.filter(function (request) {
                if (request.id_publication == req.query.id_publication) {
                  return request;
                }
              });

              if (err) {
                res.status(401).send(err);
              } else if (search.length > 0) {
                res.status(200).send(search);
              } else {
                res.status(404).send("No se han encontrado registros");
              }
            });

          case 15:
            _context.next = 19;
            break;

          case 17:
            _context.next = 19;
            return RentalRequest.aggregate([{
              '$lookup': {
                'from': 'publications',
                'localField': 'id_publication',
                'foreignField': '_id',
                'as': 'publication'
              }
            }], function (err, rentalRequests) {
              if (err) {
                res.status(401).send(err);
              } else if (rentalRequests.length > 0) {
                res.status(200).send(rentalRequests);
              } else {
                res.status(404).send("No se han encontrado registros");
              }
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _showRentalRequests.apply(this, arguments);
}

function createRentalRequest(_x3, _x4) {
  return _createRentalRequest.apply(this, arguments);
}

function _createRentalRequest() {
  _createRentalRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var rentalRequest, user, type, publication;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            rentalRequest = new RentalRequest(req.body);
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
              _context3.next = 29;
              break;
            }

            _context3.next = 12;
            return Publication.findById(rentalRequest.id_publication);

          case 12:
            publication = _context3.sent;

            if (publication) {
              _context3.next = 17;
              break;
            }

            res.status(401).send("No se ha encontrado el registro de la publicacion");
            _context3.next = 27;
            break;

          case 17:
            if (!(publication.amount == 0)) {
              _context3.next = 21;
              break;
            }

            res.status(401).send("El producto no tiene existencias disponibles para renta");
            _context3.next = 27;
            break;

          case 21:
            if (!(publication.status == false)) {
              _context3.next = 25;
              break;
            }

            res.status(401).send("La publicacion ya no esta activa");
            _context3.next = 27;
            break;

          case 25:
            _context3.next = 27;
            return rentalRequest.save( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err) {
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
                        _context2.next = 12;
                        break;

                      case 4:
                        if (!(publication.amount == 1)) {
                          _context2.next = 9;
                          break;
                        }

                        _context2.next = 7;
                        return Publication.findByIdAndUpdate(rentalRequest.id_publication, {
                          amount: publication.amount - 1,
                          status: false
                        });

                      case 7:
                        _context2.next = 11;
                        break;

                      case 9:
                        _context2.next = 11;
                        return Publication.findByIdAndUpdate(rentalRequest.id_publication, {
                          amount: publication.amount - 1
                        });

                      case 11:
                        res.status(200).json({
                          message: 'Publicacion Actualizada con Exito',
                          success: "Solicitud de Renta creada con Exito",
                          RentalRequest: rentalRequest
                        });

                      case 12:
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

          case 27:
            _context3.next = 30;
            break;

          case 29:
            res.status(401).send("Permisos insuficientes");

          case 30:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _createRentalRequest.apply(this, arguments);
}

function getRentalRequest(_x5, _x6) {
  return _getRentalRequest.apply(this, arguments);
}

function _getRentalRequest() {
  _getRentalRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var rentalRequest;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return connect();

          case 2:
            _context4.prev = 2;
            _context4.next = 5;
            return RentalRequest.findById(req.params.id);

          case 5:
            rentalRequest = _context4.sent;

            if (!rentalRequest) {
              res.status(204).send("No se han encontrado registros");
            } else {
              res.status(200).send(rentalRequest);
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
  return _getRentalRequest.apply(this, arguments);
}

function updateRentalRequest(_x7, _x8) {
  return _updateRentalRequest.apply(this, arguments);
} // exportamos las funciones definidas


function _updateRentalRequest() {
  _updateRentalRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var user, type, rentalRequest, publication, product;
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
              _context5.next = 39;
              break;
            }

            _context5.next = 11;
            return RentalRequest.findById(req.params.id, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 11:
            rentalRequest = _context5.sent;
            _context5.next = 14;
            return Publication.findById(rentalRequest.id_publication, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 14:
            publication = _context5.sent;
            _context5.next = 17;
            return Product.findById(publication.id_product);

          case 17:
            product = _context5.sent;

            if (rentalRequest) {
              _context5.next = 22;
              break;
            }

            res.status(204).send("No se han encontrado el registro");
            _context5.next = 37;
            break;

          case 22:
            if (!(product.id_lessor == user.id || rentalRequest.id_lessee == user.id)) {
              _context5.next = 37;
              break;
            }

            if (!(req.params.answer == 2)) {
              _context5.next = 28;
              break;
            }

            _context5.next = 26;
            return RentalRequest.findByIdAndUpdate(req.params.id, {
              answer: {
                "status": "Confirmada",
                "ref": 2
              }
            });

          case 26:
            _context5.next = 36;
            break;

          case 28:
            if (!(req.params.answer == 3)) {
              _context5.next = 33;
              break;
            }

            _context5.next = 31;
            return RentalRequest.findByIdAndUpdate(req.params.id, {
              answer: {
                "status": "Rechazada",
                "ref": 3
              }
            });

          case 31:
            _context5.next = 36;
            break;

          case 33:
            if (!(req.params.answer == 4)) {
              _context5.next = 36;
              break;
            }

            _context5.next = 36;
            return RentalRequest.findByIdAndUpdate(req.params.id, {
              answer: {
                "status": "Cancelada",
                "ref": 4
              }
            });

          case 36:
            res.status(200).send({
              message: 'Solicitud de Renta Actualizada con Exito'
            });

          case 37:
            _context5.next = 40;
            break;

          case 39:
            res.status(401).send("Permisos insuficientes");

          case 40:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _updateRentalRequest.apply(this, arguments);
}

module.exports = {
  createRentalRequest: createRentalRequest,
  showRentalRequests: showRentalRequests,
  getRentalRequest: getRentalRequest,
  updateRentalRequest: updateRentalRequest
};