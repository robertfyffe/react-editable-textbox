"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  border: ", ";\n  border-radius: ", ";\n  color: ", ";\n  font-size: ", ";\n  line-height: ", ";\n  outline: ", ";\n  padding: ", ";\n  min-height: ", ";\n  z-index: ", ";\n  position: relative;\n  width: 100%;\n\n  p {\n    margin: ", ";\n    min-height: 18px;\n  }\n\n  &:focus {\n    border-color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var containerBaseStyles = function containerBaseStyles(_ref) {
  var theme = _ref.theme;
  return (0, _core.css)(_templateObject(), theme.entry.border, theme.entry.borderRadius, theme.entry.color, theme.entry.fontSize, theme.entry.lineHeight, theme.entry.outline, theme.entry.padding, theme.entry.height, theme.entry.zIndex, theme.entry.textSpacing, theme.entry.focusBorderColor);
};

var containerCustomStyles = function containerCustomStyles(_ref2) {
  var customStyling = _ref2.customStyling;
  return (0, _core.css)(_templateObject2(), customStyling);
};

var Container = (0, _styled["default"])('div')(containerBaseStyles, containerCustomStyles);
var EditorEntry = (0, _react.forwardRef)(function (rest, ref) {
  return /*#__PURE__*/_react["default"].createElement(Container, (0, _extends2["default"])({
    ref: ref
  }, rest));
});
EditorEntry.propTypes = _propTypes["default"].editorEntry;
EditorEntry.defaultProps = _defaultProps["default"].editorEntry;
EditorEntry.displayName = 'EditorEntry';
var _default = EditorEntry;
exports["default"] = _default;