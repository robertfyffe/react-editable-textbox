"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _core = require("@emotion/core");

var _propTypes = _interopRequireDefault(require("./propTypes"));

var _defaultProps = _interopRequireDefault(require("./defaultProps"));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-size: ", ";\n  padding: ", ";\n  position: absolute;\n  top: 0;\n  left: 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var containerBaseStyles = function containerBaseStyles(_ref) {
  var theme = _ref.theme;
  return (0, _core.css)(_templateObject(), theme.placeholder.color, theme.placeholder.fontSize, theme.placeholder.padding);
};

var containerCustomStyles = function containerCustomStyles(_ref2) {
  var customStyling = _ref2.customStyling;
  return (0, _core.css)(_templateObject2(), customStyling);
};

var Container = (0, _styled["default"])('div')(containerBaseStyles, containerCustomStyles);
var EditorPlaceholder = (0, _react.forwardRef)(function (_ref3, ref) {
  var text = _ref3.text,
      rest = (0, _objectWithoutProperties2["default"])(_ref3, ["text"]);
  return /*#__PURE__*/_react["default"].createElement(Container, (0, _extends2["default"])({
    ref: ref
  }, rest), text);
});
EditorPlaceholder.propTypes = _propTypes["default"].editorPlaceholder;
EditorPlaceholder.defaultProps = _defaultProps["default"].editorPlaceholder;
EditorPlaceholder.displayName = 'EditorPlaceholder';
var _default = EditorPlaceholder;
exports["default"] = _default;