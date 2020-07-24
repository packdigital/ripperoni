"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.entries");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _types;

function _templateObject5() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["{", "} Fetch new node data from {red {bold Backpack}}"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["{", "} Load {bold ", "", "} from cache - {bold ", " nodes}"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["{", "} Deleted {bold ", "} nodes - {bold ", " nodes}"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["{", "} Updated {bold ", "} nodes - {bold ", " nodes}"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["{", "} Create {bold ", "} nodes - {bold ", " nodes}"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/* eslint-disable max-lines */
var createNodeHelpers = require('gatsby-node-helpers').default;

var _require = require('@packdigital/ripperoni-utilities'),
    convertToGatsbyGraphQLId = _require.convertToGatsbyGraphQLId;

var queries = require('./queries');

var middleware = require('./middlewares');

var _require2 = require('./constants'),
    LOG_PREFIX = _require2.LOG_PREFIX,
    TYPE_PREFIX = _require2.TYPE_PREFIX,
    PRODUCT = _require2.PRODUCT,
    PRODUCT_OPTION = _require2.PRODUCT_OPTION,
    PRODUCT_OPTION_VALUE = _require2.PRODUCT_OPTION_VALUE,
    PRODUCT_VARIANT = _require2.PRODUCT_VARIANT,
    IMAGE = _require2.IMAGE;

var types = (_types = {}, _types[PRODUCT] = {
  query: queries.query.product,
  subscription: queries.subscription.product,
  middleware: middleware.product
}, _types[PRODUCT_VARIANT] = {
  query: queries.query.productVariant,
  subscription: queries.subscription.productVariant,
  middleware: middleware.productVariant
}, _types[PRODUCT_OPTION] = {
  query: queries.query.productOption,
  subscription: queries.subscription.productOption,
  middleware: middleware.productOption
}, _types[PRODUCT_OPTION_VALUE] = {
  query: queries.query.productOptionValue,
  subscription: queries.subscription.productOptionValue,
  middleware: middleware.productOptionValue
}, _types[IMAGE] = {
  query: queries.query.image,
  subscription: queries.subscription.image,
  middleware: middleware.image
}, _types);

var _createNodeHelpers = createNodeHelpers({
  typePrefix: TYPE_PREFIX,
  conflictFieldPrefix: 'platform'
}),
    createNodeFactory = _createNodeHelpers.createNodeFactory;

var getFactory = function getFactory(type) {
  var _types$type = types[type],
      middleware = _types$type.middleware,
      factory = _types$type.factory;
  if (factory) return factory;
  types[type].factory = createNodeFactory(type, middleware);
  return types[type].factory;
};

var createAndCacheNode = function createAndCacheNode(type, helpers) {
  return function (data) {
    var cache = helpers.cache,
        createNode = helpers.actions.createNode;
    var factory = getFactory(type);
    var nodeData = factory(data);
    createNode(nodeData);
    cache.set(nodeData.id, nodeData);
    return nodeData;
  };
};

var deleteAndUncacheNode = function deleteAndUncacheNode(helpers) {
  return function (node) {
    var cache = helpers.cache,
        deleteNode = helpers.actions.deleteNode;
    deleteNode({
      node: node
    });
    cache.set(node.id, undefined);
    return node;
  };
};

var getDeletedNodes = function getDeletedNodes(freshData, type, helpers) {
  var getNodesByType = helpers.getNodesByType;
  var oldNodes = getNodesByType("" + TYPE_PREFIX + type);
  var freshNodeIds = freshData.map(function (_ref) {
    var id = _ref.id;
    return convertToGatsbyGraphQLId(id, type, TYPE_PREFIX);
  });
  return oldNodes.filter(function (oldNode) {
    return !freshNodeIds.includes(oldNode.id);
  });
};

var getNewData = function getNewData(freshData, type, helpers) {
  var getNodesByType = helpers.getNodesByType;
  var oldNodes = getNodesByType("" + TYPE_PREFIX + type) || [];
  var oldNodeIds = oldNodes.map(function (_ref2) {
    var id = _ref2.id;
    return id;
  }) || [];
  return freshData.filter(function (data) {
    return !oldNodeIds.includes(convertToGatsbyGraphQLId(data.id, type, TYPE_PREFIX));
  });
};

var getUpdatedData = function getUpdatedData(freshData, type, helpers) {
  var getNode = helpers.getNode;
  return freshData.filter(function (data) {
    var backpackId = convertToGatsbyGraphQLId(data.id, type, TYPE_PREFIX);
    var oldNode = getNode(backpackId);
    return oldNode && oldNode.updatedAt < data.updatedAt;
  });
};

var diffAndUpdateNodes = function diffAndUpdateNodes(_ref3) {
  var type = _ref3.type,
      helpers = _ref3.helpers;
  return function (_ref4) {
    var data = _ref4.data;
    var getNodesByType = helpers.getNodesByType,
        reporter = helpers.reporter,
        touchNode = helpers.actions.touchNode;
    var format = reporter.format,
        success = reporter.success;
    var prefixedType = "" + TYPE_PREFIX + type;
    getNodesByType(prefixedType).forEach(function (node) {
      return touchNode({
        nodeId: node.id
      });
    });
    var newNodes = getNewData(data.result, type, helpers).map(createAndCacheNode(type, helpers));
    var updatedNodes = getUpdatedData(data.result, type, helpers).map(createAndCacheNode(type, helpers));
    var deletedNodes = getDeletedNodes(data.result, type, helpers).map(deleteAndUncacheNode(helpers));

    if (newNodes.length > 0) {
      success(format(_templateObject(), LOG_PREFIX, prefixedType, newNodes.length));
    }

    if (updatedNodes.length > 0) {
      success(format(_templateObject2(), LOG_PREFIX, prefixedType, updatedNodes.length));
    }

    if (deletedNodes.length > 0) {
      success(format(_templateObject3(), LOG_PREFIX, prefixedType, deletedNodes.length));
    }
  };
};

var touchUnchangedCachedData = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_ref5) {
    var client, shopId, helpers, cache, reporter, touchNode, format, success, query, variables, backpackMeta, touchedTypes;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            client = _ref5.client, shopId = _ref5.shopId, helpers = _ref5.helpers;
            cache = helpers.cache, reporter = helpers.reporter, touchNode = helpers.actions.touchNode;
            format = reporter.format, success = reporter.success;
            query = queries.query.meta;
            variables = {
              shopId: shopId,
              ciShopId: shopId
            };
            _context3.next = 7;
            return client.query({
              query: query,
              variables: variables
            });

          case 7:
            backpackMeta = _context3.sent;
            touchedTypes = Object.entries(backpackMeta.data).map( /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_ref7) {
                var type, data, touchedNodes, nodes, results;
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        type = _ref7[0], data = _ref7[1];
                        touchedNodes = 0;
                        nodes = data.map( /*#__PURE__*/function () {
                          var _ref9 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(data) {
                            var backpackId, cachedNode, isChanged;
                            return _regenerator.default.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    backpackId = convertToGatsbyGraphQLId(data.id, type, TYPE_PREFIX);
                                    _context.next = 3;
                                    return cache.get(backpackId);

                                  case 3:
                                    _context.t0 = _context.sent;

                                    if (_context.t0) {
                                      _context.next = 6;
                                      break;
                                    }

                                    _context.t0 = {};

                                  case 6:
                                    cachedNode = _context.t0;
                                    isChanged = cachedNode.updatedAt !== data.updatedAt;

                                    if (!isChanged) {
                                      touchNode({
                                        nodeId: backpackId
                                      });
                                      touchedNodes++;
                                    }

                                  case 9:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x3) {
                            return _ref9.apply(this, arguments);
                          };
                        }()); // eslint-disable-next-line no-undef

                        _context2.next = 5;
                        return Promise.all(nodes);

                      case 5:
                        results = _context2.sent;

                        if (touchedNodes > 0) {
                          success(format(_templateObject4(), LOG_PREFIX, TYPE_PREFIX, type, touchedNodes));
                        }

                        return _context2.abrupt("return", results);

                      case 8:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x2) {
                return _ref8.apply(this, arguments);
              };
            }()); // eslint-disable-next-line no-undef

            _context3.next = 11;
            return Promise.all(touchedTypes);

          case 11:
            return _context3.abrupt("return", _context3.sent);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function touchUnchangedCachedData(_x) {
    return _ref6.apply(this, arguments);
  };
}();

var setupSubscriptions = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_ref10) {
    var client, shopId, helpers, variables;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            client = _ref10.client, shopId = _ref10.shopId, helpers = _ref10.helpers;
            variables = {
              shopId: shopId
            };
            Object.entries(types).map(function (_ref12) {
              var type = _ref12[0],
                  query = _ref12[1].subscription;
              return client.subscribe({
                query: query,
                variables: variables
              }).subscribe({
                next: diffAndUpdateNodes({
                  type: type,
                  helpers: helpers
                }),
                error: function error() {}
              });
            });

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function setupSubscriptions(_x4) {
    return _ref11.apply(this, arguments);
  };
}();

var queryForNewNodes = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_ref13) {
    var client, shopId, helpers, _helpers$reporter, format, activityTimer, query, variables, timer, _yield$client$query, data;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            client = _ref13.client, shopId = _ref13.shopId, helpers = _ref13.helpers;
            _helpers$reporter = helpers.reporter, format = _helpers$reporter.format, activityTimer = _helpers$reporter.activityTimer;
            query = queries.query.newNodes;
            variables = {
              shopId: shopId,
              ciShopId: shopId
            };
            timer = activityTimer(format(_templateObject5(), LOG_PREFIX));
            timer.start();
            _context5.next = 8;
            return client.query({
              query: query,
              variables: variables
            });

          case 8:
            _yield$client$query = _context5.sent;
            data = _yield$client$query.data;
            timer.end();
            Object.entries(data).map(function (_ref15) {
              var type = _ref15[0],
                  result = _ref15[1];
              return diffAndUpdateNodes({
                type: type,
                helpers: helpers
              })({
                data: {
                  result: result
                }
              });
            });

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function queryForNewNodes(_x5) {
    return _ref14.apply(this, arguments);
  };
}();

exports.createContentNodes = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(_ref16) {
    var client, shopId, helpers;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            client = _ref16.client, shopId = _ref16.shopId, helpers = _ref16.helpers;
            _context6.prev = 1;
            _context6.next = 4;
            return touchUnchangedCachedData({
              client: client,
              shopId: shopId,
              helpers: helpers
            });

          case 4:
            _context6.next = 6;
            return queryForNewNodes({
              client: client,
              shopId: shopId,
              helpers: helpers
            });

          case 6:
            if (!(process.env.NODE_ENV !== 'production')) {
              _context6.next = 9;
              break;
            }

            _context6.next = 9;
            return setupSubscriptions({
              client: client,
              shopId: shopId,
              helpers: helpers
            });

          case 9:
            return _context6.abrupt("return", Promise.resolve());

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            helpers.reporter.panic('Something went wrong while creating Backpack Nodes: ', _context6.t0);

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));

  return function (_x6) {
    return _ref17.apply(this, arguments);
  };
}();