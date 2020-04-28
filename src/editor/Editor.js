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
    const defaultTextCount =
      defaultText && this.removeAllHtml(defaultText).length;

    this.state = {
      charCount: defaultTextCount || 0,
      text: defaultText || null
    };
  }

  componentDidMount = () => {
    this.editorEntry.innerHTML = this.props.defaultText || '<p></p>';
  };

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

  handleFocus = () => this.handleEvent(this.props.onFocus);

  handleBlur = () => this.handleEvent(this.props.onBlur);

  handleOnInput = ({ target }) => {
    const text = this.cleanHtml(target.innerHTML);
    const textCleaned = this.removeAllHtml(target.innerHTML);

    this.setText(text);
    this.setCharCount(textCleaned.length);
    this.handleEvent(this.props.onInput);
  };

  handleKeyUp = () => {
    if (this.state.charCount) {
      return;
    }

    this.editorEntry.innerHTML = '<p></p>';
  };

  removeAllHtml = (text) => this.cleanHtml(text, []);

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
          ref={(ref) => {
            this.editor = ref;
          }}
          {...{
            disabled,
            customStyling: styles.editor,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur
          }}
        >
          {!charCount && (
            <EditorPlaceholder
              {...{
                elRef: (ref) => {
                  this.editorPlaceholder = ref;
                },
                customStyling: styles.editorPlaceholder
              }}
            >
              {placeholder}
            </EditorPlaceholder>
          )}

          <EditorEntry
            {...{
              elRef: (ref) => {
                this.editorEntry = ref;
              },
              role,
              text,
              customStyling: styles.editorEntry,
              onInput: this.handleOnInput,
              onKeyUp: this.handleKeyUp,
              ...aria
            }}
          />
        </Container>
      </ThemeProvider>
    );
  };
}

export default Editor;
