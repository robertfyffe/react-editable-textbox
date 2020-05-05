import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import propTypes from './propTypes';
import defaultProps from './defaultProps';

const containerBaseStyles = ({ theme }) => css`
  color: ${theme.placeholder.color};
  font-size: ${theme.placeholder.fontSize};
  padding: ${theme.placeholder.padding};
  position: absolute;
  top: 0;
  left: 0;
`;

const containerCustomStyles = ({ customStyling }) => css`
  ${customStyling}
`;

const Container = styled('div')(containerBaseStyles, containerCustomStyles);

const EditorPlaceholder = forwardRef(({ text, ...rest }, ref) => (
  <Container ref={ref} {...rest}>
    {text}
  </Container>
));

EditorPlaceholder.propTypes = propTypes.editorPlaceholder;
EditorPlaceholder.defaultProps = defaultProps.editorPlaceholder;
EditorPlaceholder.displayName = 'EditorPlaceholder';

export default EditorPlaceholder;
