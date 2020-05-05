"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _core = require("@emotion/core");

var _emotionTheming = require("emotion-theming");

var utils = _interopRequireWildcard(require("./utils"));

var _propTypes = _interopRequireDefault(require("./propTypes"));

var _defaultProps = _interopRequireDefault(require("./defaultProps"));

var _constants = require("./constants");

var _themes = require("../themes");

var _EditorPlaceholder = _interopRequireDefault(require("./EditorPlaceholder"));

var _EditorEntry = _interopRequireDefault(require("./EditorEntry"));

var _EditorStash = _interopRequireDefault(require("./EditorStash"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n  ", ";\n  ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    pointer-events: none;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background: ", ";\n  border-radius: ", ";\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  margin: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var CONTAINER = _constants.elements.CONTAINER,
    PLACEHOLDER = _constants.elements.PLACEHOLDER,
    ENTRY = _constants.elements.ENTRY,
    STASH = _constants.elements.STASH;

var containerBaseStyles = function containerBaseStyles(_ref) {
  var theme = _ref.theme;
  return (0, _core.css)(_templateObject(), theme.editor.background, theme.entry.borderRadius, theme.editor.margin);
};

var containerDisabledStyles = function containerDisabledStyles(_ref2) {
  var disabled = _ref2.disabled;
  return disabled && (0, _core.css)(_templateObject2());
};

var containerCustomStyles = function containerCustomStyles(_ref3) {
  var customStyling = _ref3.customStyling;
  return (0, _core.css)(_templateObject3(), customStyling);
};

var Container = (0, _styled["default"])('div')(_templateObject4(), containerBaseStyles, containerDisabledStyles, containerCustomStyles);

var initialState = function initialState(_ref4) {
  var defaultText = _ref4.defaultText;
  var defaultTextCount = defaultText && utils.getCharCount(defaultText);
  return {
    charCount: defaultTextCount || 0
  };
};

var Editor = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(Editor, _PureComponent);

  var _super = _createSuper(Editor);

  function Editor(_props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Editor);
    _this = _super.call(this, _props);

    _this.componentDidMount = function () {
      return _this.setInnerHTML(_this.parseProps["default"], _this.props.defaultText);
    };

    _this.componentDidUpdate = function (prevProps) {
      if (_this.props.children !== prevProps.children) {
        _this.setInnerHTML(_this.state.charCount, _this.stash.innerHTML);

        utils.replaceCaret(_this.entry);
      }
    };

    _this.setInnerHTML = function (props, text) {
      var getText = utils.handleGetText(props);
      _this.entry.innerHTML = getText(text);
    };

    _this.initEventProps = function (inputValue) {
      return utils.getEventProps({
        props: _this.parseProps,
        inputValue: inputValue
      });
    };

    _this.handleOnBlur = function (text) {
      return utils.publishEvent(_this.initEventProps(text), _this.props.onBlur);
    };

    _this.handleOnFocus = function (text) {
      return utils.publishEvent(_this.initEventProps(text), _this.props.onFocus);
    };

    _this.handleOnKeyUp = function () {
      return !_this.state.charCount && _this.setInnerHTML(_this.parseProps.clean);
    };

    _this.handleOnInput = function (text) {
      var charCount = utils.getCharCount(text);

      _this.setState({
        charCount: charCount
      });

      var onInput = _this.props.onInput;

      if (!onInput) {
        return;
      }

      clearTimeout(_this.timer);
      _this.timer = utils.publishOnInput({
        parse: _this.parseProps,
        charCount: charCount,
        text: text,
        onInput: onInput
      });
    };

    _this.getProps = function (element) {
      var allProps = utils.propManager(Object.assign(Object.assign({}, _this.props), {}, {
        elements: {
          container: CONTAINER,
          placeholder: PLACEHOLDER,
          entry: ENTRY,
          stash: STASH
        },
        handlers: {
          onInput: _this.handleOnInput,
          onFocus: _this.handleOnFocus,
          onBlur: _this.handleOnBlur,
          onKeyUp: _this.handleOnKeyUp
        }
      }));
      return Object.assign({
        ref: function ref(_ref5) {
          _this[element] = _ref5;
        }
      }, allProps[element]);
    };

    _this.render = function () {
      var _this$props = _this.props,
          theme = _this$props.theme,
          isGhost = _this$props.isGhost;
      var isEmpty = !_this.state.charCount;
      return /*#__PURE__*/_react["default"].createElement(_emotionTheming.ThemeProvider, {
        theme: utils.getTheme({
          themes: Object.assign(Object.assign({}, _themes.allThemes), {}, {
            user: theme
          }),
          isGhost: isGhost
        })
      }, /*#__PURE__*/_react["default"].createElement(Container, _this.getProps(CONTAINER), isEmpty && /*#__PURE__*/_react["default"].createElement(_EditorPlaceholder["default"], _this.getProps(PLACEHOLDER)), /*#__PURE__*/_react["default"].createElement(_EditorEntry["default"], _this.getProps(ENTRY)), /*#__PURE__*/_react["default"].createElement(_EditorStash["default"], _this.getProps(STASH))));
    };

    var allowedAttributes = _props.allowedAttributes,
        allowedTags = _props.allowedTags;
    _this.timer = null;
    _this.parseProps = {
      "default": {
        allowedAttributes: allowedAttributes,
        allowedTags: allowedTags
      },
      clean: {
        allowedAttributes: [],
        allowedTags: []
      }
    };
    _this.state = initialState(_this.props);
    return _this;
  }

  return Editor;
}(_react.PureComponent);

Editor.defaultProps = _defaultProps["default"].editor;
var _default = Editor;
exports["default"] = _default;