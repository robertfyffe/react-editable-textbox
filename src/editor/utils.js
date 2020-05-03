import { sanitize } from 'dompurify';
import { htmlElements, timers } from './constants';

const { DEFAULT_ELEMENT } = htmlElements;
const { INPUT_WAIT_INTERVAL } = timers;

const parseCleanProps = props =>
  props || {
    default: null,
    clean: null
  };

const parseStyles = styles => styles || {};

const subscribe = (props, done) => done && done({ ...props });

const cleanHtml = ({ text, allowedAttributes, allowedTags }) =>
  sanitize(text, {
    ALLOWED_ATTR: allowedAttributes || [],
    ALLOWED_TAGS: allowedTags || []
  });

const formatText = (props, text) =>
  cleanHtml({
    text,
    ...props
  });

const getCharCount = text =>
  cleanHtml({
    text
  }).length;

const setEditorText = text => text || DEFAULT_ELEMENT;

const publishEvent = (props, done) => subscribe(props, done);

const textParser = (props, text) => formatText(props, text);

const initTextParser = text => props => textParser(props, text);

const getText = text => setEditorText(text);

const handleGetText = notEmpty => text => (notEmpty && getText(text)) || null;

const getInnerHTML = (props, text) => {
  const parser = initTextParser(text);

  if (text !== DEFAULT_ELEMENT) {
    return parser(parseCleanProps(props).default);
  }

  return parser(parseCleanProps(props).clean);
};

const getEventProps = ({ props, inputValue } = {}) => {
  const charCount = getCharCount(inputValue);
  const text = getInnerHTML(props, inputValue) || null;

  return {
    charCount,
    text
  };
};

const getCustomStyling = (element, styles) => {
  return {
    customStyling: parseStyles(styles)[element] || {}
  };
};

const getTheme = ({ themes, isGhost }) => {
  const { base, ghost, user } = themes;
  const appTheme = isGhost ? ghost : base;
  const { editor, editorPlaceholder, editorEntry } = appTheme;

  return {
    ...appTheme,
    editor: {
      ...editor,
      ...user.editor
    },
    editorPlaceholder: {
      ...editorPlaceholder,
      ...user.editorPlaceholder
    },
    editorEntry: {
      ...editorEntry,
      ...user.editorEntry
    }
  };
};

const propManager = ({ elements, handlers, ...rest }) => {
  const { onFocus, onBlur, onInput, onKeyUp } = handlers;
  const { children, placeholder, disabled, styles, role, aria } = rest;

  return {
    [elements.container]: {
      ...getCustomStyling(elements.container, styles),
      onFocus: ({ target }) => onFocus(target.innerHTML),
      onBlur: ({ target }) => onBlur(target.innerHTML),
      disabled
    },
    [elements.placeholder]: {
      ...getCustomStyling(elements.placeholder, styles),
      text: placeholder
    },
    [elements.entry]: {
      ...getCustomStyling(elements.entry, styles),
      onInput: ({ target }) => onInput(target.innerHTML),
      onKeyUp: () => onKeyUp(),
      role,
      ...aria
    },
    [elements.stash]: {
      children
    }
  };
};

const replaceCaret = element => {
  if (!element) {
    return;
  }

  const target = document.createTextNode('');
  const selection = window.getSelection();
  const range = document.createRange();

  element.appendChild(target);
  range.setStart(target, 0);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

const createOnInputTimer = (props, done) =>
  setTimeout(() => publishEvent(props, done), INPUT_WAIT_INTERVAL);

const publishOnInput = ({ parse, charCount, text, onInput }) =>
  createOnInputTimer(
    {
      charCount,
      text: getInnerHTML(parse, text)
    },
    onInput
  );

export {
  publishEvent,
  handleGetText,
  getEventProps,
  getCharCount,
  getTheme,
  propManager,
  replaceCaret,
  publishOnInput
};
