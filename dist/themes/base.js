"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editorEntry = exports.editorPlaceholder = exports.editor = void 0;

var _colors = require("./colors");

var editor = {
  background: _colors.colors.n100,
  borderRadius: '5px',
  fontSize: '16px',
  margin: '0 0 15px',
  padding: '6px 0 6px 10px',
  textSpacing: '0 0 15px',
  height: '38px'
};
exports.editor = editor;
var editorPlaceholder = {
  color: _colors.colors.n500,
  fontSize: editor.fontSize,
  padding: editor.padding
};
exports.editorPlaceholder = editorPlaceholder;
var editorEntry = {
  border: "1px solid ".concat(_colors.colors.n500),
  focusBorderColor: _colors.colors.n700,
  borderRadius: editor.borderRadius,
  color: _colors.colors.n800,
  fontSize: editor.fontSize,
  lineHeight: '22px',
  padding: editor.padding,
  textSpacing: editor.textSpacing,
  height: editor.height,
  zIndex: 10
};
exports.editorEntry = editorEntry;