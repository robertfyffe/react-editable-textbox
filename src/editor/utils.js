import { sanitize } from 'dompurify';
import { htmlElements } from './constants';

const { DEFAULT_ELEMENT } = htmlElements;

const callEvent = (cb) => (props) => cb({ ...props });

const getEvent = (ev, props) => callEvent(ev)(props);

export const handleEvent = (ev, props) => getEvent(ev, props);

export const cleanHtml = ({ text, allowedAttributes, allowedTags, tags }) => {
  return sanitize(text, {
    ALLOWED_ATTR: allowedAttributes,
    ALLOWED_TAGS: tags || allowedTags
  });
};

export const setText = (text) => text || DEFAULT_ELEMENT;

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
