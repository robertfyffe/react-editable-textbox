"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _default = {
  editor: {
    styles: _propTypes["default"].object,
    theme: _propTypes["default"].object,
    html: _propTypes["default"].node,
    aria: _propTypes["default"].object,
    role: _propTypes["default"].string,
    defaultText: _propTypes["default"].string,
    placeholder: _propTypes["default"].string,
    allowedAttributes: _propTypes["default"].array,
    allowedTags: _propTypes["default"].array,
    disabled: _propTypes["default"].bool,
    isGhost: _propTypes["default"].bool,
    onBlur: _propTypes["default"].func,
    onFocus: _propTypes["default"].func,
    onInput: _propTypes["default"].func
  },
  editorPlaceholder: {
    text: _propTypes["default"].string,
    customStyling: _propTypes["default"].object
  },
  editorEntry: {
    role: _propTypes["default"].string,
    'aria-placeholder': _propTypes["default"].string,
    'aria-labelledby': _propTypes["default"].string,
    customStyling: _propTypes["default"].object,
    children: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
    tabIndex: _propTypes["default"].number,
    contentEditable: _propTypes["default"].bool,
    suppressContentEditableWarning: _propTypes["default"].bool,
    spellCheck: _propTypes["default"].bool,
    onInput: _propTypes["default"].func
  },
  editorStash: {
    children: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node])
  }
};
exports["default"] = _default;