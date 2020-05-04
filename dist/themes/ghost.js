"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editorEntry = exports.editorPlaceholder = exports.editor = void 0;

var _colors = require("./colors");

var editor = {
  fontSize: '21px',
  margin: '0 0 15px'
};
exports.editor = editor;
var editorPlaceholder = {
  color: _colors.colors.n500,
  fontSize: editor.fontSize
};
exports.editorPlaceholder = editorPlaceholder;
var editorEntry = {
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
exports.editorEntry = editorEntry;