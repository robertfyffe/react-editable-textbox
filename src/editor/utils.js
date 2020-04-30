import { sanitize } from 'dompurify';
import { htmlElements, elements } from './constants';

const { DEFAULT_ELEMENT } = htmlElements;
const { EDITOR, EDITOR_PLACEHOLDER, EDITOR_ENTRY } = elements;

const callEvent = cb => props => cb({ ...props });

const getEvent = (ev, props) => callEvent(ev)(props);

export const handleEvent = (ev, props) => getEvent(ev, props);

export const cleanHtml = ({ text, allowedAttributes, allowedTags, tags }) => {
  return sanitize(text, {
    ALLOWED_ATTR: allowedAttributes,
    ALLOWED_TAGS: tags || allowedTags
  });
};

export const setText = text => text || DEFAULT_ELEMENT;

export const getCustomStyling = (element, styles) => {
  return {
    customStyling: styles[element] || {}
  };
};

export const getTheme = ({ themes, isGhost }) => {
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

export const propManager = ({ props, state, handlers }) => {
  const {
    onFocus,
    onBlur,
    onInput,
    placeholder,
    disabled,
    styles,
    role,
    aria
  } = props;
  const { charCount, text } = state;

  return {
    [EDITOR]: {
      ...getCustomStyling(EDITOR, styles),
      onFocus: () => handleEvent(onFocus, state),
      onBlur: () => handleEvent(onBlur, state),
      disabled
    },
    [EDITOR_PLACEHOLDER]: {
      ...getCustomStyling(EDITOR_PLACEHOLDER, styles),
      text: placeholder
    },
    [EDITOR_ENTRY]: {
      ...getCustomStyling(EDITOR_ENTRY, styles),
      onInput: ({ target }) => {
        handlers.onInput(target);
        handleEvent(onInput, state);
      },
      onKeyUp: () => !charCount && handlers.setHTML(),
      text,
      role,
      ...aria
    }
  };
};
