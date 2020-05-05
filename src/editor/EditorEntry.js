import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import propTypes from './propTypes';
import defaultProps from './defaultProps';

const containerBaseStyles = ({ theme }) => css`
  border: ${theme.entry.border};
  border-radius: ${theme.entry.borderRadius};
  color: ${theme.entry.color};
  font-size: ${theme.entry.fontSize};
  line-height: ${theme.entry.lineHeight};
  outline: ${theme.entry.outline};
  padding: ${theme.entry.padding};
  min-height: ${theme.entry.height};
  z-index: ${theme.entry.zIndex};
  position: relative;
  width: 100%;

  p {
    margin: ${theme.entry.textSpacing};
    min-height: 18px;
  }

  &:focus {
    border-color: ${theme.entry.focusBorderColor};
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
