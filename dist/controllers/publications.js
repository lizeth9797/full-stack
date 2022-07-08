"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoose = require('mongoose');

var connect = require('../config/database');

var Publication = require('../models/Publication');

var User = require('../models/User');

var Product = require('../models/Product');

var Category = require('../models/Category');

function showPublications(_x, _x2) {
  return _showPublications.apply(this, arguments);
}

function _showPublications() {
  _showPublications = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var search, searchPublications, publications, categories;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connect();

          case 2:
            if (!req.query.title) {
              _context.next = 8;
              break;
            }

            search = new RegExp("".concat(req.query.title), 'i');
            _context.next = 6;
            return Publication.aggregate([{
              '$lookup': {
                'from': 'products',
                'localField': 'id_product',
                'foreignField': '_id',
                'as': 'product'
              }
            }, {
              '$match': {
                'title': search,
                'status': true
              }
            }], function (err, publications) {
              if (err) {
                res.status(401).send(err);
              } else if (publications.length > 0) {
                res.status(200).send(publications);
              } else {
                res.status(404).send("No se han encontrado registros");
              }
            });

          case 6:
            _context.next = 38;
            break;

          case 8:
            if (!req.query.sector) {
              _context.next = 19;
              break;
            }

            searchPublications = function searchPublications(publications, categories) {
              var listCategories = [];
              var results = [];
              categories.forEach(function (category) {
                if (category.sector[0]._id == req.query.sector) {
                  listCategories.push(String(category._id));
                }
              });

              var _loop = function _loop(index) {
                publications.filter(function (publication) {
                  if (publication.product[0].id_category == listCategories[index]) {
                    results.push(publication);
                  }
                });
              };

              for (var index = 0; index < listCategories.length; index++) {
                _loop(index);
              }

              if (publications.length <= 0) {
                res.status(404).send("No se han encontrado registros");
              } else {
                res.status(200).send(results);
              }
            };

            _context.next = 12;
            return Publication.aggregate([{
              '$lookup': {
                'from': 'products',
                'localField': 'id_product',
                'foreignField': '_id',
                'as': 'product'
              }
            }, {
              '$match': {
                'status': true
              }
            }], function (err, publications) {
              if (err) {
                res.status(401).send(err);
              } else {
                return publications;
              }
            });

          case 12:
            publications = _context.sent;
            _context.next = 15;
            return Category.aggregate([{
              '$lookup': {
                'from': 'sectors',
                'localField': 'id_sector',
                'foreignField': '_id',
                'as': 'sector'
              }
            }, {
              '$match': {
                'status': true
              }
            }], function (err, categories) {
              if (err) {
                res.status(401).send(err);
              } else {
                return categories;
              }
            });

          case 15:
            categories = _context.sent;
            searchPublications(publications, categories);
            _context.next = 38;
            break;

          case 19:
            if (!req.query.category) {
              _context.next = 24;
              break;
            }

            _context.next = 22;
            return Publication.aggregate([{
              '$lookup': {
                'from': 'products',
                'localField': 'id_product',
                'foreignField': '_id',
                'as': 'product'
              }
            }, {
              '$match': {
                'status': true
              }
            }], function (err, publications) {
              var search = publications.filter(function (publication) {
                if (publication.product[0].id_category == req.query.category) {
                  return publication;
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

          case 22:
            _context.next = 38;
            break;

          case 24:
            if (!req.query.id_lessor) {
              _context.next = 29;
              break;
            }

            _context.next = 27;
            return Publication.aggregate([{
              '$lookup': {
                'from': 'products',
                'localField': 'id_product',
                'foreignField': '_id',
                'as': 'product'
              }
            }], function (err, publications) {
              var search = publications.filter(function (publication) {
                if (publication.product[0].id_lessor == req.query.id_lessor) {
                  return publication;
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

          case 27:
            _context.next = 38;
            break;

          case 29:
            if (!(req.query.min_price || req.query.max_price)) {
              _context.next = 36;
              break;
            }

            if (!req.query.min_price) {
              req.query.min_price = 0;
            }

            if (!req.query.max_price) {
              req.query.max_price = Infinity;
            }

            _context.next = 34;
            return Publication.aggregate([{
              '$match': {
                'prices': {
                  '$gte': Number(req.query.min_price),
                  '$lte': Number(req.query.max_price),
                  'status': true
                }
              }
            }, {
              '$lookup': {
                'from': 'products',
                'localField': 'id_product',
                'foreignField': '_id',
                'as': 'product'
              }
            }], function (err, publications) {
              if (err) {
                res.status(401).send(err);
              } else {
                if (err) {
                  res.status(401).send(err);
                } else if (publications.length > 0) {
                  res.status(200).send(publications);
                } else {
                  res.status(404).send("No se han encontrado registros");
                }
              }
            });

          case 34:
            _context.next = 38;
            break;

          case 36:
            _context.next = 38;
            return Publication.aggregate([{
              '$lookup': {
                'from': 'products',
                'localField': 'id_product',
                'foreignField': '_id',
                'as': 'product'
              }
            }, {
              '$match': {
                'status': true
              }
            }], function (err, publications) {
              if (err) {
                res.send(err);
              } else {
                res.status(200).send(publications);
              }
            });

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _showPublications.apply(this, arguments);
}

function createPublication(_x3, _x4) {
  return _createPublication.apply(this, arguments);
}

function _createPublication() {
  _createPublication = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var publication, updateProduct, user, type;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            publication = new Publication(req.body);

            updateProduct = /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return Product.updateOne({
                          _id: req.body.id_product
                        }, {
                          $set: {
                            published: true
                          }
                        });

                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function updateProduct() {
                return _ref.apply(this, arguments);
              };
            }();

            _context3.next = 4;
            return connect();

          case 4:
            _context3.next = 6;
            return User.findById(req.usuario.id);

          case 6:
            user = _context3.sent;
            _context3.next = 9;
            return user.typeUser(user.id_type);

          case 9:
            type = _context3.sent;

            if (!(type === 2 || type === 4 || type === 3)) {
              _context3.next = 15;
              break;
            }

            _context3.next = 13;
            return publication.save(function (err) {
              if (err) {
                res.status(400).json({
                  success: false,
                  type: err.title,
                  error: err.message
                });
              } else {
                updateProduct();
                res.status(201).json({
                  success: "Publicacion creada con Exito",
                  task: "Producto Publicado",
                  Publication: publication
                });
              }
            });

          case 13:
            _context3.next = 16;
            break;

          case 15:
            res.status(401).send("Permisos insuficientes");

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _createPublication.apply(this, arguments);
}

function getPublication(_x5, _x6) {
  return _getPublication.apply(this, arguments);
}

function _getPublication() {
  _getPublication = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return connect();

          case 2:
            _context4.next = 4;
            return Publication.aggregate([{
              '$lookup': {
                'from': 'products',
                'localField': 'id_product',
                'foreignField': '_id',
                'as': 'product'
              }
            }, {
              '$lookup': {
                'from': 'categories',
                'localField': 'product.id_category',
                'foreignField': '_id',
                'as': 'category'
              }
            }, {
              '$lookup': {
                'from': 'users',
                'localField': 'product.id_lessor',
                'foreignField': '_id',
                'as': 'lessor'
              }
            }, {
              '$match': {
                "_id": mongoose.Types.ObjectId(req.params.id)
              }
            }], function (err, publications) {
              if (err) {
                res.status(401).send(err);
              } else if (publications.length > 0) {
                res.status(200).send(publications);
              } else {
                console.log(publications);
                res.status(404).send("No se han encontrado registros");
              }
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getPublication.apply(this, arguments);
}

function updatePublication(_x7, _x8) {
  return _updatePublication.apply(this, arguments);
}

function _updatePublication() {
  _updatePublication = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var user, type, publication, product;
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
              _context5.next = 28;
              break;
            }

            _context5.next = 11;
            return Publication.findById(req.params.id, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 11:
            publication = _context5.sent;
            _context5.next = 14;
            return Product.findById(publication.id_product);

          case 14:
            product = _context5.sent;

            if (publication) {
              _context5.next = 19;
              break;
            }

            res.status(204).send("No se han encontrado el registro");
            _context5.next = 26;
            break;

          case 19:
            if (!(product.id_lessor != user.id)) {
              _context5.next = 23;
              break;
            }

            res.status(401).send("Permisos insuficientes");
            _context5.next = 26;
            break;

          case 23:
            _context5.next = 25;
            return Publication.findByIdAndUpdate(req.params.id, {
              $set: req.body
            });

          case 25:
            res.status(200).send({
              message: 'Publicacion Actualizada con Exito'
            });

          case 26:
            _context5.next = 29;
            break;

          case 28:
            res.status(401).send("Permisos insuficientes");

          case 29:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _updatePublication.apply(this, arguments);
}

function disablePublication(_x9, _x10) {
  return _disablePublication.apply(this, arguments);
}

function _disablePublication() {
  _disablePublication = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var user, type, publication, product;
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

            if (!(type === 2 || type === 4 || type === 3)) {
              _context6.next = 28;
              break;
            }

            _context6.next = 11;
            return Publication.findById(req.params.id, function (err) {
              if (err) {
                res.status(400).json({
                  error: err.name,
                  message: err.message
                });
              }
            });

          case 11:
            publication = _context6.sent;
            _context6.next = 14;
            return Product.findById(publication.id_product);

          case 14:
            product = _context6.sent;

            if (publication) {
              _context6.next = 19;
              break;
            }

            res.status(204).send("No se han encontrado el registro");
            _context6.next = 26;
            break;

          case 19:
            if (!(product.id_lessor != user.id)) {
              _context6.next = 23;
              break;
            }

            res.status(401).send("Permisos insuficientes");
            _context6.next = 26;
            break;

          case 23:
            _context6.next = 25;
            return Publication.findByIdAndUpdate(req.params.id, {
              "status": false
            });

          case 25:
            res.status(200).send({
              message: 'Publicacion Deshabilitada con Exito'
            });

          case 26:
            _context6.next = 29;
            break;

          case 28:
            res.status(401).send("Permisos insuficientes");

          case 29:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _disablePublication.apply(this, arguments);
}

function disablePublications(_x11, _x12) {
  return _disablePublications.apply(this, arguments);
} // exportamos las funciones definidas


function _disablePublications() {
  _disablePublications = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
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
            return Publication.updateMany({
              "status": false
            }, function (err, publications) {
              if (err) {
                res.status(401).send("No se han encontrado el registros");
              } else {
                res.status(200).send({
                  message: 'Publicaciones Deshabilitadas con Exito'
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
  return _disablePublications.apply(this, arguments);
}

module.exports = {
  createPublication: createPublication,
  showPublications: showPublications,
  getPublication: getPublication,
  disablePublication: disablePublication,
  updatePublication: updatePublication,
  disablePublications: disablePublications
};