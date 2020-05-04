"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allThemes = void 0;

var base = _interopRequireWildcard(require("./base"));

var ghost = _interopRequireWildcard(require("./ghost"));

var allThemes = {
  base: base,
  ghost: ghost
};
exports.allThemes = allThemes;