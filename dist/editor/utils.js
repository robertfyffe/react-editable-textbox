"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishOnInput = exports.replaceCaret = exports.propManager = exports.getTheme = exports.getCharCount = exports.getEventProps = exports.handleGetText = exports.publishEvent = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _dompurify = require("dompurify");

var _constants = require("./constants");

var DEFAULT_ELEMENT = _constants.htmlElements.DEFAULT_ELEMENT;
var INPUT_WAIT_INTERVAL = _constants.timers.INPUT_WAIT_INTERVAL;

var parseCleanProps = function parseCleanProps(props) {
  return props || {
    "default": null,
    clean: null
  };
};

var parseStyles = function parseStyles(styles) {
  return styles || {};
};

var subscribe = function subscribe(props, done) {
  return done && done(Object.assign({}, props));
};

var cleanHtml = function cleanHtml(_ref) {
  var text = _ref.text,
      allowedAttributes = _ref.allowedAttributes,
      allowedTags = _ref.allowedTags;
  return (0, _dompurify.sanitize)(text, {
    ALLOWED_ATTR: allowedAttributes || [],
    ALLOWED_TAGS: allowedTags || []
  });
};

var formatText = function formatText(props, text) {
  return cleanHtml(Object.assign({
    text: text
  }, props));
};

var getCharCount = function getCharCount(text) {
  return cleanHtml({
    text: text
  }).length;
};

exports.getCharCount = getCharCount;

var setEditorText = function setEditorText(text) {
  return text || DEFAULT_ELEMENT;
};

var publishEvent = function publishEvent(props, done) {
  return subscribe(props, done);
};

exports.publishEvent = publishEvent;

var textParser = function textParser(props, text) {
  return formatText(props, text);
};

var initTextParser = function initTextParser(text) {
  return function (props) {
    return textParser(props, text);
  };
};

var getText = function getText(text) {
  return setEditorText(text);
};

var handleGetText = function handleGetText(notEmpty) {
  return function (text) {
    return notEmpty && getText(text) || null;
  };
};

exports.handleGetText = handleGetText;

var getInnerHTML = function getInnerHTML(props, text) {
  var parser = initTextParser(text);

  if (text !== DEFAULT_ELEMENT) {
    return parser(parseCleanProps(props)["default"]);
  }

  return parser(parseCleanProps(props).clean);
};

var getEventProps = function getEventProps() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      props = _ref2.props,
      inputValue = _ref2.inputValue;

  var charCount = getCharCount(inputValue);
  var text = getInnerHTML(props, inputValue) || null;
  return {
    charCount: charCount,
    text: text
  };
};

exports.getEventProps = getEventProps;

var getCustomStyling = function getCustomStyling(element, styles) {
  return {
    customStyling: parseStyles(styles)[element] || {}
  };
};

var getTheme = function getTheme(_ref3) {
  var themes = _ref3.themes,
      isGhost = _ref3.isGhost;
  var base = themes.base,
      ghost = themes.ghost,
      user = themes.user;
  var appTheme = isGhost ? ghost : base;
  var editor = appTheme.editor,
      placeholder = appTheme.placeholder,
      entry = appTheme.entry;
  return Object.assign(Object.assign({}, appTheme), {}, {
    editor: Object.assign(Object.assign({}, editor), user.editor),
    placeholder: Object.assign(Object.assign({}, placeholder), user.placeholder),
    entry: Object.assign(Object.assign({}, entry), user.entry)
  });
};

exports.getTheme = getTheme;

var propManager = function propManager(_ref4) {
  var _ref8;

  var elements = _ref4.elements,
      handlers = _ref4.handlers,
      rest = (0, _objectWithoutProperties2["default"])(_ref4, ["elements", "handlers"]);
  var _onFocus = handlers.onFocus,
      _onBlur = handlers.onBlur,
      _onInput = handlers.onInput,
      _onKeyUp = handlers.onKeyUp;
  var children = rest.children,
      placeholder = rest.placeholder,
      disabled = rest.disabled,
      styles = rest.styles,
      role = rest.role,
      aria = rest.aria;
  return _ref8 = {}, (0, _defineProperty2["default"])(_ref8, elements.container, Object.assign(Object.assign({}, getCustomStyling(elements.container, styles)), {}, {
    onFocus: function onFocus(_ref5) {
      var target = _ref5.target;
      return _onFocus(target.innerHTML);
    },
    onBlur: function onBlur(_ref6) {
      var target = _ref6.target;
      return _onBlur(target.innerHTML);
    },
    disabled: disabled
  })), (0, _defineProperty2["default"])(_ref8, elements.placeholder, Object.assign(Object.assign({}, getCustomStyling(elements.placeholder, styles)), {}, {
    text: placeholder
  })), (0, _defineProperty2["default"])(_ref8, elements.entry, Object.assign(Object.assign({}, getCustomStyling(elements.entry, styles)), {}, {
    onInput: function onInput(_ref7) {
      var target = _ref7.target;
      return _onInput(target.innerHTML);
    },
    onKeyUp: function onKeyUp() {
      return _onKeyUp();
    },
    role: role
  }, aria)), (0, _defineProperty2["default"])(_ref8, elements.stash, {
    children: children
  }), _ref8;
};

exports.propManager = propManager;

var replaceCaret = function replaceCaret(element) {
  if (!element) {
    return;
  }

  var target = document.createTextNode('');
  var selection = window.getSelection();
  var range = document.createRange();
  element.appendChild(target);
  range.setStart(target, 0);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

exports.replaceCaret = replaceCaret;

var createOnInputTimer = function createOnInputTimer(props, done) {
  return setTimeout(function () {
    return publishEvent(props, done);
  }, INPUT_WAIT_INTERVAL);
};

var publishOnInput = function publishOnInput(_ref9) {
  var parse = _ref9.parse,
      charCount = _ref9.charCount,
      text = _ref9.text,
      onInput = _ref9.onInput;
  return createOnInputTimer({
    charCount: charCount,
    text: getInnerHTML(parse, text)
  }, onInput);
};

exports.publishOnInput = publishOnInput;