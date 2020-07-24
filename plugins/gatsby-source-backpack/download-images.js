"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _templateObject4() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["{bold ", " files}"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["{", "} Download {bold ", "} files"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["{bold ", " files}"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteralLoose2.default)(["{", "} Load {bold ", "} files from cache"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _require = require('gatsby-source-filesystem'),
    createRemoteFileNode = _require.createRemoteFileNode;

var _require2 = require('@packdigital/ripperoni-utilities'),
    downloadImageAndCreateRemoteFileNode = _require2.downloadImageAndCreateRemoteFileNode;

var _require3 = require('./constants'),
    LOG_PREFIX = _require3.LOG_PREFIX,
    TYPE_PREFIX = _require3.TYPE_PREFIX,
    IMAGE = _require3.IMAGE;

exports.downloadImages = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref) {
    var helpers, getNodesByType, reporter, format, success, prefixedImage, downloadedImages, images, cachedFiles, downloadedFiles, cachedFilesMessage, cachedFilesResultMessage, downloadedFilesMessage, downloadedFilesResultMessage;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            helpers = _ref.helpers;
            getNodesByType = helpers.getNodesByType, reporter = helpers.reporter;
            format = reporter.format, success = reporter.success;
            prefixedImage = "" + TYPE_PREFIX + IMAGE;
            downloadedImages = getNodesByType(prefixedImage).map(function (node) {
              return downloadImageAndCreateRemoteFileNode(node, helpers, createRemoteFileNode, TYPE_PREFIX);
            }); // eslint-disable-next-line no-undef

            _context.next = 7;
            return Promise.all(downloadedImages).then(function (images) {
              return images.filter(function (image) {
                return image;
              });
            });

          case 7:
            images = _context.sent;
            cachedFiles = images.filter(function (_ref3) {
              var type = _ref3.type;
              return type === 'TOUCH_NODE';
            });
            downloadedFiles = images.filter(function (_ref4) {
              var __typename = _ref4.__typename;
              return __typename === 'Image';
            });

            if (cachedFiles.length > 0) {
              cachedFilesMessage = format(_templateObject(), LOG_PREFIX, prefixedImage);
              cachedFilesResultMessage = format(_templateObject2(), cachedFiles.length);
              success(cachedFilesMessage + " - " + cachedFilesResultMessage);
            }

            if (downloadedFiles.length > 0) {
              downloadedFilesMessage = format(_templateObject3(), LOG_PREFIX, prefixedImage);
              downloadedFilesResultMessage = format(_templateObject4(), downloadedFiles.length);
              success(downloadedFilesMessage + " - " + downloadedFilesResultMessage);
            }

            return _context.abrupt("return", images);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();