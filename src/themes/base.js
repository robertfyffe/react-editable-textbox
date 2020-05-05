import { colors } from './colors';

export const editor = {
  background: colors.n100,
  borderRadius: '5px',
  fontSize: '16px',
  margin: '0 0 15px',
  padding: '6px 0 6px 10px',
  textSpacing: '0 0 15px',
  height: '38px'
};

export const placeholder = {
  color: colors.n500,
  fontSize: editor.fontSize,
  padding: editor.padding
};

export const entry = {
  border: `1px solid ${colors.n500}`,
  focusBorderColor: colors.n700,
  borderRadius: editor.borderRadius,
  color: colors.n800,
  fontSize: editor.fontSize,
  lineHeight: '22px',
  padding: editor.padding,
  textSpacing: editor.textSpacing,
  height: editor.height,
  zIndex: 10
};
