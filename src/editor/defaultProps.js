export default {
  editor: {
    aria: {},
    styles: {},
    theme: {},
    role: 'textbox',
    placeholder: 'Placeholder text...',
    allowedAttributes: [],
    allowedTags: ['p'],
    disabled: false,
    isGhost: false,
    onBlur: () => {},
    onFocus: () => {},
    onInput: () => {}
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
    text: null,
    onInput: () => {}
  }
};
