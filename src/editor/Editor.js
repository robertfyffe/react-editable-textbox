import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import sanitizeHtml from 'sanitize-html';

import propTypes from './propTypes';
import defaultProps from './defaultProps';
import { baseTheme } from '../themes';

import EditorPlaceholder from './EditorPlaceholder';
import EditorEntry from './EditorEntry';

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
  static propTypes = propTypes.editor;

  static defaultProps = defaultProps.editor;

  constructor(props) {
    super(props);

    const { defaultText } = props;

    this.state = {
      focused: false,
      charCount: (defaultText && defaultText.length) || null,
      text: defaultText || null
    };
  }

  setFocused = () =>
    this.setState({
      focused: !this.state.focused
    });

  setCharCount = (charCount) =>
    this.setState({
      charCount
    });

  setText = (text) =>
    this.setState({
      text
    });

  handleEvent = (requestedEvent) => {
    if (!requestedEvent) {
      return;
    }

    const { charCount, text } = this.state;

    requestedEvent({
      charCount,
      text
    });
  };

  handleFocus = () => {
    this.setFocused();
    this.handleEvent(this.props.onFocus);
  };

  handleBlur = () => {
    this.setFocused();
    this.handleEvent(this.props.onBlur);
  };

  handleOnInput = ({ target }) => {
    const text = this.cleanHtml(target.innerHTML);
    const textCleaned = this.cleanHtml(target.innerHTML, []);

    this.setText(text);
    this.setCharCount(textCleaned.length);
    this.handleEvent(this.props.onInput);
  };

  cleanHtml = (text, tags) => {
    const { allowedAttributes, allowedTags } = this.props;

    return sanitizeHtml(text, {
      allowedAttributes,
      allowedTags: tags || allowedTags
    });
  };

  render = () => {
    const { styles, disabled, theme, placeholder, aria, role } = this.props;
    const { charCount, text } = this.state;

    const editorTheme = {
      ...baseTheme,
      editor: {
        ...baseTheme.editor,
        ...theme.editor
      },
      editorPlaceholder: {
        ...baseTheme.editorPlaceholder,
        ...theme.editorPlaceholder
      },
      editorEntry: {
        ...baseTheme.editorEntry,
        ...theme.editorEntry
      }
    };

    return (
      <ThemeProvider theme={editorTheme}>
        <Container
          {...{
            customStyling: styles.editor,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            disabled
          }}
        >
          {!charCount && (
            <EditorPlaceholder
              {...{
                customStyling: styles.editorPlaceholder
              }}
            >
              {placeholder}
            </EditorPlaceholder>
          )}

          <EditorEntry
            {...{
              ...aria,
              role,
              customStyling: styles.editorEntry,
              onInput: this.handleOnInput,
              text,
              charCount
            }}
          />
        </Container>
      </ThemeProvider>
    );
  };
}

export default Editor;