import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import propTypes from './propTypes';
import defaultProps from './defaultProps';

const containerBaseStyles = ({ theme }) => css`
  color: ${theme.editorPlaceholder.color};
  font-size: ${theme.editorPlaceholder.fontSize};
  padding: ${theme.editorPlaceholder.padding};
  position: absolute;
  top: 0;
  left: 0;
`;

const containerCustomStyles = ({ customStyling }) => css`
  ${customStyling}
`;

const Container = styled('div')(containerBaseStyles, containerCustomStyles);

const EditorPlaceholder = ({ children, ...rest }) => (
  <Container {...rest}>{children}</Container>
);

EditorPlaceholder.propTypes = propTypes.editorPlaceholder;
EditorPlaceholder.defaultProps = defaultProps.editorPlaceholder;

export default EditorPlaceholder;
