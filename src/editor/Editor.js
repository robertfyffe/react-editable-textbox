import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import * as utils from './utils';
import propTypes from './propTypes';
import defaultProps from './defaultProps';
import { elements } from './constants';
import { allThemes } from '../themes';

import EditorPlaceholder from './EditorPlaceholder';
import EditorEntry from './EditorEntry';
import EditorStash from './EditorStash';

const { CONTAINER, PLACEHOLDER, ENTRY, STASH } = elements;

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

const initialState = ({ defaultText }) => {
  const defaultTextCount = defaultText && utils.getCharCount(defaultText);
  return {
    charCount: defaultTextCount || 0
  };
};

class Editor extends PureComponent {
  constructor(props) {
    super(props);

    const { allowedAttributes, allowedTags } = props;

    this.timer = null;

    this.parseProps = {
      default: {
        allowedAttributes,
        allowedTags
      },
      clean: {
        allowedAttributes: [],
        allowedTags: []
      }
    };

    this.state = initialState(this.props);
  }

  componentDidMount = () =>
    this.setInnerHTML(this.parseProps.default, this.props.defaultText);

  componentDidUpdate = prevProps => {
    if (this.props.children !== prevProps.children) {
      this.setInnerHTML(this.state.charCount, this.stash.innerHTML);
      utils.replaceCaret(this.entry);
    }
  };

  setInnerHTML = (props, text) => {
    const getText = utils.handleGetText(props);
    this.entry.innerHTML = getText(text);
  };

  initEventProps = inputValue =>
    utils.getEventProps({ props: this.parseProps, inputValue });

  handleOnBlur = text =>
    utils.publishEvent(this.initEventProps(text), this.props.onBlur);

  handleOnFocus = text =>
    utils.publishEvent(this.initEventProps(text), this.props.onFocus);

  handleOnKeyUp = () =>
    !this.state.charCount && this.setInnerHTML(this.parseProps.clean);

  handleOnInput = text => {
    const charCount = utils.getCharCount(text);
    this.setState({ charCount });

    const { onInput } = this.props;
    if (!onInput) {
      return;
    }

    clearTimeout(this.timer);
    this.timer = utils.publishOnInput({
      parse: this.parseProps,
      charCount,
      text,
      onInput
    });
  };

  getProps = element => {
    const allProps = utils.propManager({
      ...this.props,
      elements: {
        container: CONTAINER,
        placeholder: PLACEHOLDER,
        entry: ENTRY,
        stash: STASH
      },
      handlers: {
        onInput: this.handleOnInput,
        onFocus: this.handleOnFocus,
        onBlur: this.handleOnBlur,
        onKeyUp: this.handleOnKeyUp
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
    const isEmpty = !this.state.charCount;

    return (
      <ThemeProvider
        theme={utils.getTheme({
          themes: {
            ...allThemes,
            user: theme
          },
          isGhost
        })}
      >
        <Container {...this.getProps(CONTAINER)}>
          {isEmpty && <EditorPlaceholder {...this.getProps(PLACEHOLDER)} />}
          <EditorEntry {...this.getProps(ENTRY)} />
          <EditorStash {...this.getProps(STASH)} />
        </Container>
      </ThemeProvider>
    );
  };
}

Editor.propTypes = propTypes.editor;
Editor.defaultProps = defaultProps.editor;

export default Editor;
