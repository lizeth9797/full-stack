"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var connect = require('../config/database');

var Product = require('../models/Product');

var User = require('../models/User');

function showProducts(_x, _x2) {
  return _showProducts.apply(this, arguments);
}

function _showProducts() {
  _showProducts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
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
                  name: 1,
                  image: 1,
                  description: 1,
                  id_category: 1,
                  id_lessor: 1,
                  createdAt: 1,
                  status: 1,
                  updatedAt: 1
                };
              }
            } else {
              req.body.require = {
                name: 1,
                image: 1,
                description: 1,
                id_category: 1,
                id_lessor: 1,
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
            return Product.aggregate([{
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
            }], function (err, products) {
              if (err) {
                res.status(401).send(err);
              } else if (products.length > 0) {
                res.status(200).send(products);
              } else {
                res.status(204).send("No se han encontrado registros");
              }
            });

          case 6:
            _context.next = 25;
            break;

          case 8:
            if (!(req.query.id_lessor && req.query.published)) {
              _context.next = 13;
              break;
            }

            _context.next = 11;
            return Product.aggregate([{
              '$lookup': {
                'from': 'categories',
                'localField': 'id_category',
                'foreignField': '_id',
                'as': 'category'
              }
            }, {
              '$match': {
                'published': false
              }
            }], function (err, products) {
              var search = products.filter(function (product) {
                if (product.id_lessor == req.query.id_lessor) {
                  return product;
                }
              });

              if (err) {
                res.send(err);
              } else {
                res.status(200).send(search);
              }
            });

          case 11:
            _context.next = 25;
            break;

          case 13:
            if (!req.query.id_lessor) {
              _context.next = 18;
              break;
            }

            _context.next = 16;
            return Product.aggregate([{
              '$lookup': {
                'from': 'categories',
                'localField': 'id_category',
                'foreignField': '_id',
                'as': 'category'
              }
            }], function (err, products) {
              var search = products.filter(function (product) {
                if (product.id_lessor == req.query.id_lessor) {
                  return product;
                }
              });

              if (err) {
                res.send(err);
              } else {
                res.status(200).send(search);
              }
            });

          case 16:
            _context.next = 25;
            break;

          case 18:
            if (!req.query.id_category) {
              _context.next = 23;
              break;
            }

            _context.next = 21;
            return Product.find({
              id_category: req.query.id_category
            }, function (err, products) {
              if (err) {
                res.status(401).send(err);
              } else if (products.length > 0) {
                res.status(200).send(products);
              } else {
                res.status(404).send("No se han encontrado registros");
              }
            });

          case 21:
            _context.next = 25;
            break;

          case 23:
            _context.next = 25;
            return Product.aggregate([{
              '$project': req.body.require
            }, {
              '$limit': req.body.limit
            }], function (err, products) {
              console.log(req.body.require);

              if (err) {
                res.status(401).send(err);
              } else if (products.length > 0) {
                res.status(200).send(products);
              } else {
                res.status(204).send("No se han encontrado registros");
              }
            });

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _showProducts.apply(this, arguments);
}

function createProduct(_x3, _x4) {
  return _createProduct.apply(this, arguments);
}

function _createProduct() {
  _createProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var product, user, type;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            product = new Product(req.body);
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

            if (!(type === 2 || type === 4 || type === 3)) {
              _context2.next = 14;
              break;
            }

            _context2.next = 12;
            return product.save(function (err) {
              if (err) {
                res.status(400).json({
                  success: false,
                  type: err.title,
                  error: err.message
                });
              } else {
                res.status(201).json({
                  success: "Producto creado con Exito",
                  Product: product
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
  return _createProduct.apply(this, arguments);
}

function getProduct(_x5, _x6) {
  return _getProduct.apply(this, arguments);
}

function _getProduct() {
  _getProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var product;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Product.findById(req.params.id);

          case 3:
            product = _context3.sent;

            if (!product) {
              res.status(204).send("No se han encontrado registros");
            } else {
              res.status(200).send(product);
            }

            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            res.status(400).send(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return _getProduct.apply(this, arguments);
}

function updateProduct(_x7, _x8) {
  return _updateProduct.apply(this, arguments);
}

function _updateProduct() {
  _updateProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var user, type, product;
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

            if (!(type === 2 || type === 4 || type === 3)) {
              _context4.next = 25;
              break;
            }

            _context4.next = 11;
            return Product.findById(req.params.id, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 11:
            product = _context4.sent;

            if (product) {
              _context4.next = 16;
              break;
            }

            res.status(204).send("No se han encontrado el registro");
            _context4.next = 23;
            break;

          case 16:
            if (!(product.id_lessor != user.id)) {
              _context4.next = 20;
              break;
            }

            res.status(401).send("Permisos insuficientes");
            _context4.next = 23;
            break;

          case 20:
            _context4.next = 22;
            return Product.findByIdAndUpdate(req.params.id, {
              $set: req.body
            });

          case 22:
            res.status(200).send({
              message: 'Producto Actualizado con Exito'
            });

          case 23:
            _context4.next = 26;
            break;

          case 25:
            res.status(401).send("Permisos insuficientes");

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _updateProduct.apply(this, arguments);
}

function disableProduct(_x9, _x10) {
  return _disableProduct.apply(this, arguments);
}

function _disableProduct() {
  _disableProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var user, type, product;
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
              _context5.next = 25;
              break;
            }

            _context5.next = 11;
            return Product.findById(req.params.id, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 11:
            product = _context5.sent;

            if (product) {
              _context5.next = 16;
              break;
            }

            res.status(204).send("No se han encontrado el registro");
            _context5.next = 23;
            break;

          case 16:
            if (!(product.id_lessor != user.id)) {
              _context5.next = 20;
              break;
            }

            res.status(401).send("Permisos insuficientes");
            _context5.next = 23;
            break;

          case 20:
            _context5.next = 22;
            return Product.findByIdAndUpdate(req.params.id, {
              "status": false
            });

          case 22:
            res.status(200).send({
              message: 'Producto Deshabilitado con Exito'
            });

          case 23:
            _context5.next = 26;
            break;

          case 25:
            res.status(401).send("Permisos insuficientes");

          case 26:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _disableProduct.apply(this, arguments);
}

function disableProducts(_x11, _x12) {
  return _disableProducts.apply(this, arguments);
} // exportamos las funciones definidas


function _disableProducts() {
  _disableProducts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
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
            return Product.updateMany({
              "status": false
            }, function (err, products) {
              if (err) {
                res.status(401).send("No se han encontrado el registros");
              } else {
                res.status(200).send({
                  message: 'Productos Deshabilitados con Exito'
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
  return _disableProducts.apply(this, arguments);
}

module.exports = {
  createProduct: createProduct,
  showProducts: showProducts,
  getProduct: getProduct,
  disableProduct: disableProduct,
  updateProduct: updateProduct,
  disableProducts: disableProducts
};