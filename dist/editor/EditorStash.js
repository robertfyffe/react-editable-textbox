"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _core = require("@emotion/core");

var _propTypes = _interopRequireDefault(require("./propTypes"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: none;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var containerBaseStyles = function containerBaseStyles() {
  return (0, _core.css)(_templateObject());
};

var Container = (0, _styled["default"])('div')(containerBaseStyles);
var EditorStash = (0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(Container, {
    ref: ref
  }, children);
});
EditorStash.propTypes = _propTypes["default"].EditorStash;
EditorStash.displayName = 'EditorStash';
var _default = EditorStash;
exports["default"] = _default;