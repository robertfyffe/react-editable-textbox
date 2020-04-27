import React, { PureComponent, createRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import propTypes from './propTypes';
import defaultProps from './defaultProps';

const containerBaseStyles = ({ theme }) => css`
  border: 1px solid ${theme.editorEntry.borderColor};
  border-radius: ${theme.editorEntry.borderRadius};
  color: ${theme.editorEntry.color};
  font-size: ${theme.editorEntry.fontSize};
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

class EditorEntry extends PureComponent {
  static propTypes = propTypes.editorEntry;

  static defaultProps = defaultProps.editorEntry;

  el = createRef();

  getRef = () => this.el.current;

  componentDidMount = () => {
    this.getRef().innerHTML = this.props.text || '<p></p>';
  };

  handleOnKeyUp = () => {
    const { charCount } = this.props;

    if (!charCount) {
      this.getRef().innerHTML = '<p></p>';
    }
  };

  render = () => (
    <Container ref={this.el} {...this.props} onKeyUp={this.handleOnKeyUp} />
  );
}

export default EditorEntry;
