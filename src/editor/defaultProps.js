export default {
  editor: {
    aria: {},
    styles: {},
    theme: {},
    role: 'textbox',
    placeholder: 'Placeholder text...',
    defaultText: null,
    allowedAttributes: [],
    allowedTags: ['p'],
    disabled: false,
    isGhost: false,
    onBlur: () => {},
    onFocus: () => {}
  },
  editorPlaceholder: {
    text: null,
    customStyling: {}
  },
  editorEntry: {
    tabIndex: 0,
    role: 'textbox',
    customStyling: {},
    contentEditable: true,
    suppressContentEditableWarning: true,
    spellCheck: false,
    disabled: false,
    text: null
  }
};
