import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import propTypes from './propTypes';
import defaultProps from './defaultProps';

const containerBaseStyles = ({ theme }) => css`
  border: ${theme.editorEntry.border};
  border-radius: ${theme.editorEntry.borderRadius};
  color: ${theme.editorEntry.color};
  font-size: ${theme.editorEntry.fontSize};
  line-height: ${theme.editorEntry.lineHeight};
  outline: ${theme.editorEntry.outline};
  padding: ${theme.editorEntry.padding};
  min-height: ${theme.editorEntry.height};
  z-index: ${theme.editorEntry.zIndex};
  position: relative;
  width: 100%;

  p {
    margin: ${theme.editorEntry.textSpacing};
    min-height: 18px;
  }

  &:focus {
    border-color: ${theme.editorEntry.focusBorderColor};
  }
`;

const containerCustomStyles = ({ customStyling }) => css`
  ${customStyling}
`;

const Container = styled('div')(containerBaseStyles, containerCustomStyles);

const EditorEntry = forwardRef((rest, ref) => (
  <Container ref={ref} {...rest} />
));

EditorEntry.propTypes = propTypes.editorEntry;
EditorEntry.defaultProps = defaultProps.editorEntry;
EditorEntry.displayName = 'EditorEntry';

export default EditorEntry;
