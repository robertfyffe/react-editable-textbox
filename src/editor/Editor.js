import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import propTypes from './propTypes';
import defaultProps from './defaultProps';
import { elements } from './constants';
import { cleanHtml, getTheme, setText, propManager } from './utils';
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
      text: defaultText || null,
      component: null
    };
  }

  componentDidMount = () => this.setInnerHTML(this.props.defaultText);

  componentDidUpdate = prevProps => {
    if (prevProps.html !== this.props.html) {
      this.setComponent(this.props.html);
    }
  };

  setCharCount = charCount =>
    this.setState({
      charCount
    });

  setText = text =>
    this.setState({
      text
    });

  setComponent = component =>
    this.setState({
      component
    });

  formatText = ({ ...props }) =>
    cleanHtml({
      ...props,
      ...this.cleanProps
    });

  updateStateText = text =>
    this.setText(
      this.formatText({
        text
      })
    );

  removeAllHtml = text =>
    this.formatText({
      text,
      tags: []
    });

  getCharCount = text => this.removeAllHtml(text).length;

  setInnerHTML = text => {
    this.editorEntry.innerHTML = setText(text);
  };

  handleOnInput = text => {
    this.updateStateText(text);
    this.setCharCount(this.getCharCount(text));
  };

  getProps = element => {
    const allProps = propManager({
      props: this.props,
      state: this.state,
      handlers: {
        setHTML: this.setInnerHTML,
        onInput: this.handleOnInput
      }
    });

    return {
      ref: ref => {
        this[element] = ref;
      },
      ...allProps[element]
    };
  };

  render = () => {
    const { theme, isGhost } = this.props;
    const { charCount, component } = this.state;
    const isEmpty = !charCount;
    const isComponent = !!component;

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
        <Container {...this.getProps(EDITOR)}>
          {isEmpty && (
            <EditorPlaceholder {...this.getProps(EDITOR_PLACEHOLDER)} />
          )}
          <EditorEntry {...this.getProps(EDITOR_ENTRY)}>
            {isComponent ? component : null}
          </EditorEntry>
        </Container>
      </ThemeProvider>
    );
  };
}

Editor.propTypes = propTypes.editor;
Editor.defaultProps = defaultProps.editor;

export default Editor;
