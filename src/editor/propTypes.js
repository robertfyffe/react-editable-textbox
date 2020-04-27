import PropTypes from 'prop-types';

export default {
  editor: {
    classNames: PropTypes.object,
    styles: PropTypes.object,
    theme: PropTypes.object,
    aria: PropTypes.object,
    role: PropTypes.string,
    placeholder: PropTypes.string,
    allowedAttributes: PropTypes.object,
    allowedTags: PropTypes.array,
    disabled: PropTypes.bool,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onInput: PropTypes.func
  },
  editorPlaceholder: {
    className: PropTypes.string
  },
  editorEntry: {
    'aria-placeholder': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    className: PropTypes.string,
    customStyling: PropTypes.object,
    onInput: PropTypes.func,
    charCount: PropTypes.number,
    tabIndex: PropTypes.number,
    contentEditable: PropTypes.bool,
    suppressContentEditableWarning: PropTypes.bool,
    spellCheck: PropTypes.bool
  }
};
