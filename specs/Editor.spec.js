/* eslint-env mocha */
import should from 'should';
import React from 'react';
import ReactDOM from 'react-dom';

import { EditableTextBox } from 'react-editable-textbox';
import { contentAttribute, renderEditableTextBox } from './helpers';

export default () => {
  it('has default props', () => {
    const node = document.createElement('div');

    // eslint-disable-next-line react/no-render-return-value
    const editableTextBox = ReactDOM.render(<EditableTextBox />, node);
    const { props } = editableTextBox;

    props.aria.should.be.eql({});
    props.styles.should.be.eql({});
    props.theme.should.be.eql({});
    props.role.should.be.eql('textbox');
    props.placeholder.should.be.eql('Placeholder text...');
    props.allowedAttributes.should.be.eql([]);
    props.allowedTags.should.be.eql(['p']);
    props.disabled.should.not.be.ok();

    ReactDOM.unmountComponentAtNode(node);
  });

  // eslint-disable-next-line max-len
  it('renders the editable text box as disabled when provided', () => {
    const editableTextBox = renderEditableTextBox({ disabled: true });
    contentAttribute('editor')(editableTextBox, 'disabled').should.be.eql('');
  });

  // eslint-disable-next-line max-len
  it('renders the editable text box with the default aria role when not provided', () => {
    const editableTextBox = renderEditableTextBox();
    contentAttribute('editorEntry')(editableTextBox, 'role').should.be.eql(
      'textbox'
    );
  });

  it('verify default prop of onFocus', () => {
    const editableTextBox = renderEditableTextBox();
    editableTextBox.props.onFocus.should.be.ok();
  });

  it('verify default prop of onBlur', () => {
    const editableTextBox = renderEditableTextBox();
    editableTextBox.props.onBlur.should.be.ok();
  });

  it('verify default prop of onInput', () => {
    const editableTextBox = renderEditableTextBox();
    editableTextBox.props.onInput.should.be.ok();
  });

  it('verify charCount is zero if text empty', () => {
    const editableTextBox = renderEditableTextBox();
    editableTextBox.state.charCount.should.be.eql(0);
  });

  it('verify charCount is 12 if default text is provided with length 12', () => {
    const editableTextBox = renderEditableTextBox({
      defaultText: 'This is text'
    });
    editableTextBox.state.charCount.should.be.eql(12);
  });

  // eslint-disable-next-line max-len
  it('verify charCount is 12 if default text with length 12 is provided with extra HTML elements', () => {
    const editableTextBox = renderEditableTextBox({
      defaultText: '<p>This is text</p>'
    });
    editableTextBox.state.charCount.should.be.eql(12);
  });

  it('verify charCount is 12 if text of length 12 is manually inputted', () => {
    const editableTextBox = renderEditableTextBox();
    editableTextBox.handleOnInput('This is text');
    editableTextBox.state.charCount.should.be.eql(12);
  });

  it('verify editor contains empty <p> tags if no default text is provided', () => {
    const editableTextBox = renderEditableTextBox({ defaultText: '' });
    editableTextBox.editorEntry.innerHTML.should.be.eql('<p></p>');
  });
};
