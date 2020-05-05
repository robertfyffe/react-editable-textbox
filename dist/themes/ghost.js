"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.entry = exports.placeholder = exports.editor = void 0;

var _colors = require("./colors");

var editor = {
  fontSize: '21px',
  margin: '0 0 15px'
};
exports.editor = editor;
var placeholder = {
  color: _colors.colors.n500,
  fontSize: editor.fontSize
};
exports.placeholder = placeholder;
var entry = {
  focusBorderColor: _colors.colors.n700,
  borderRadius: editor.borderRadius,
  color: _colors.colors.n800,
  fontSize: editor.fontSize,
  lineHeight: '28px',
  padding: editor.padding,
  textSpacing: '0 0 15px',
  zIndex: 10,
  outline: 0
};
exports.entry = entry;