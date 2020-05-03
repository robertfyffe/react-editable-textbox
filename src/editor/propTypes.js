import PropTypes from 'prop-types';

export default {
  editor: {
    styles: PropTypes.object,
    theme: PropTypes.object,
    html: PropTypes.node,
    aria: PropTypes.object,
    role: PropTypes.string,
    defaultText: PropTypes.string,
    placeholder: PropTypes.string,
    allowedAttributes: PropTypes.array,
    allowedTags: PropTypes.array,
    disabled: PropTypes.bool,
    isGhost: PropTypes.bool,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onInput: PropTypes.func
  },
  editorPlaceholder: {
    text: PropTypes.string,
    customStyling: PropTypes.object
  },
  editorEntry: {
    role: PropTypes.string,
    'aria-placeholder': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    customStyling: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    tabIndex: PropTypes.number,
    contentEditable: PropTypes.bool,
    suppressContentEditableWarning: PropTypes.bool,
    spellCheck: PropTypes.bool,
    onInput: PropTypes.func
  },
  editorStash: {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  }
};
