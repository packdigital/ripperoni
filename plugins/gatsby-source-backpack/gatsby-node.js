"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _templateObject3() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["Sourced {bold Backpack} nodes from {red {bold Backpack}}"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["Fetching data and creating nodes"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["{", "}"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var path = require('path');

var fs = require('fs-extra');

var _require = require('@packdigital/ripperoni-utilities'),
    isShopifyGid = _require.isShopifyGid;

var _require2 = require('./src/types'),
    typeDefs = _require2.typeDefs;

var _require3 = require('./src/client'),
    createClient = _require3.createClient;

var _require4 = require('./src/nodes'),
    createContentNodes = _require4.createContentNodes;

var _require5 = require('./src/download-images'),
    downloadImages = _require5.downloadImages;

var _require6 = require('./src/constants'),
    LOG_PREFIX = _require6.LOG_PREFIX,
    PLUGIN_NAME = _require6.PLUGIN_NAME;

exports.createSchemaCustomization = function (_ref) {
  var createTypes = _ref.actions.createTypes;
  return createTypes(typeDefs);
};

exports.sourceNodes = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(helpers, options) {
    var _helpers$reporter, format, panic, activityTimer, accessToken, shopId, backpackUri, timer, client;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _helpers$reporter = helpers.reporter, format = _helpers$reporter.format, panic = _helpers$reporter.panic, activityTimer = _helpers$reporter.activityTimer;
            accessToken = options.accessToken, shopId = options.shopId, backpackUri = options.backpackUri;
            timer = activityTimer(format(_templateObject(), LOG_PREFIX));

            if (!accessToken) {
              panic("Please include a Backpack access token to " + PLUGIN_NAME + ".");
            }

            if (!backpackUri) {
              panic("Please include a Backpack uri to " + PLUGIN_NAME + ".");
            }

            if (!shopId || !isShopifyGid(shopId)) {
              panic("Please include a Shopify graphql shop id to " + PLUGIN_NAME + ".");
            }

            client = createClient({
              accessToken: accessToken,
              backpackUri: backpackUri
            });
            timer.start();
            timer.setStatus(format(_templateObject2()));
            _context.next = 11;
            return createContentNodes({
              client: client,
              shopId: shopId,
              helpers: helpers
            });

          case 11:
            timer.setStatus('Downloading images');
            _context.next = 14;
            return downloadImages({
              helpers: helpers
            });

          case 14:
            timer.setStatus(format(_templateObject3()));
            timer.end();

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.onPreExtractQueries = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_ref3) {
    var store, getNodesByType, program;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            store = _ref3.store, getNodesByType = _ref3.getNodesByType;
            program = store.getState().program;
            _context2.next = 4;
            return fs.copy(path.join(__dirname, 'fragments', 'fragments.js'), program.directory + "/.cache/fragments/backpack-fragments.js");

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3) {
    return _ref4.apply(this, arguments);
  };
}();