const neutrals = {
  n100: '#FAFBFC',
  n200: '#EEF0F2',
  n300: '#D8DDE1',
  n500: '#9DA7B1',
  n700: '#5C656F',
  n800: '#323E49',
  n900: '#212933'
};

const colors = {
  ...neutrals
};

export const editor = {
  background: colors.n100,
  borderRadius: '5px',
  fontSize: '16px',
  margin: '0 0 15px',
  padding: '6px 0 6px 10px',
  textSpacing: '0 0 15px',
  height: '33px'
};

export const editorPlaceholder = {
  color: colors.n500,
  fontSize: editor.fontSize,
  padding: editor.padding
};

export const editorEntry = {
  borderColor: colors.n500,
  focusBorderColor: colors.n700,
  borderRadius: editor.borderRadius,
  color: colors.n800,
  fontSize: editor.fontSize,
  padding: editor.padding,
  textSpacing: editor.textSpacing,
  height: editor.height,
  zIndex: 10
};
