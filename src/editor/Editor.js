import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import propTypes from './propTypes';
import defaultProps from './defaultProps';
import { elements } from './constants';
import {
  cleanHtml,
  getTheme,
  getCustomStyling,
  handleEvent,
  setText
} from './utils';
import { allThemes } from '../themes';

import EditorPlaceholder from './EditorPlaceholder';
import EditorEntry from './EditorEntry';

const { EDITOR, EDITOR_PLACEHOLDER, EDITOR_ENTRY } = elements;

const containerBaseStyles = ({ theme }) => css`
  background: ${theme.editor.background};
  border-radius: ${theme.editorEntry.borderRadius};
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: ${theme.editor.margin};
`;

const containerDisabledStyles = ({ disabled }) =>
  disabled &&
  css`
    pointer-events: none;
  `;

const containerCustomStyles = ({ customStyling }) => css`
  ${customStyling}
`;

const Container = styled('div')`
  ${containerBaseStyles};
  ${containerDisabledStyles};
  ${containerCustomStyles};
`;

class Editor extends PureComponent {
  constructor(props) {
    super(props);
    const { defaultText, allowedTags, allowedAttributes } = props;

    this.cleanProps = {
      allowedTags,
      allowedAttributes
    };

    const defaultTextCount = defaultText && this.getCharCount(defaultText);

    this.state = {
      charCount: defaultTextCount || 0,
      text: defaultText || null
    };
  }

  componentDidMount = () => this.setInnerHTML(this.props.defaultText);

  createRef = (ref, name) => {
    this[name] = ref;
  };

  setCharCount = (charCount) =>
    this.setState({
      charCount
    });

  setText = (text) =>
    this.setState({
      text
    });

  formatText = ({ ...props }) =>
    cleanHtml({
      ...props,
      ...this.cleanProps
    });

  updateStateText = (text) =>
    this.setText(
      this.formatText({
        text
      })
    );

  removeAllHtml = (text) =>
    this.formatText({
      text,
      tags: []
    });

  getCharCount = (text) => this.removeAllHtml(text).length;

  setInnerHTML = (text) => {
    this.editorEntry.innerHTML = setText(text);
  };

  handleOnInput = (text) => {
    this.updateStateText(text);
    this.setCharCount(this.getCharCount(text));
  };

  render = () => {
    const {
      styles,
      disabled,
      theme,
      placeholder,
      aria,
      role,
      isGhost,
      onFocus,
      onBlur,
      onInput
    } = this.props;
    const isEmpty = !this.state.charCount;

    const propManager = {
      [EDITOR]: {
        ref: (ref) => this.createRef(ref, EDITOR),
        onFocus: () => handleEvent(onFocus, this.state),
        onBlur: () => handleEvent(onBlur, this.state),
        ...getCustomStyling(EDITOR, styles),
        disabled
      },
      [EDITOR_PLACEHOLDER]: {
        elRef: (ref) => this.createRef(ref, EDITOR_PLACEHOLDER),
        ...getCustomStyling(EDITOR_PLACEHOLDER, styles),
        text: placeholder
      },
      [EDITOR_ENTRY]: {
        elRef: (ref) => this.createRef(ref, EDITOR_ENTRY),
        onInput: ({ target }) => {
          this.handleOnInput(target.innerHTML);
          handleEvent(onInput, this.state);
        },
        onKeyUp: () => isEmpty && this.setInnerHTML(),
        ...getCustomStyling(EDITOR_ENTRY, styles),
        text: this.state.text,
        role,
        ...aria
      }
    };

    const getProps = (element) => propManager[element];

    return (
      <ThemeProvider
        theme={getTheme({
          themes: {
            ...allThemes,
            user: theme
          },
          isGhost
        })}
      >
        <Container {...getProps(EDITOR)}>
          {isEmpty && <EditorPlaceholder {...getProps(EDITOR_PLACEHOLDER)} />}
          <EditorEntry {...getProps(EDITOR_ENTRY)} />
        </Container>
      </ThemeProvider>
    );
  };
}

Editor.propTypes = propTypes.editor;
Editor.defaultProps = defaultProps.editor;

export default Editor;
