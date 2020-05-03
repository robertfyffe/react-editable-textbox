/* eslint-env mocha */
import React from 'react';
import ReactDOM from 'react-dom';
import should from 'should';
import sinon, { useFakeTimers } from 'sinon';
import { EditableTextBox } from 'react-editable-textbox';

import {
  focusAt,
  blurAt,
  keyUpAt,
  inputAt,
  renderEditableTextBox,
  unmountEditableTextBox
} from './helpers';
import { timers } from '../src/editor/constants';

const { INPUT_WAIT_INTERVAL } = timers;

const textStubs = {
  noHtml: 'This is text...',
  html: '<p>This is text...</p>',
  attack: '<p>This <script>is</script> text</p>'
};

const stateStubs = {
  noHtml: {
    text: textStubs.noHtml,
    charCount: 15
  },
  html: {
    text: textStubs.html,
    charCount: 15
  },
  attack: {
    text: textStubs.attack,
    charCount: 15
  },
  empty: {
    text: null,
    charCount: 0
  }
};

export default () => {
  describe('LifeCycle', () => {
    describe('componentDidUpdate', () => {
      it('verify setInnerHTML is correctly called when children prop changes', () => {
        const spy = sinon.spy();

        const node = document.createElement('div');
        const editableTextBox = ReactDOM.render(<EditableTextBox />, node);

        spy(editableTextBox, 'setInnerHTML');

        ReactDOM.render(
          <EditableTextBox>{'This is a child'}</EditableTextBox>,
          node
        );

        spy.should.be.called;
        editableTextBox.stash.innerHTML.should.be.eql('This is a child');
      });
    });
  });

  describe('Listeners', () => {
    describe('onBlur', () => {
      it('verify onBlur callback is fired when the onBlur event occurs', () => {
        const requestBlurCallback = sinon.spy();

        const editableTextBox = renderEditableTextBox({
          onBlur: requestBlurCallback
        });

        // focus the editor
        blurAt(editableTextBox.entry);
        requestBlurCallback.called.should.be.ok();

        // Check if event is passed to onFocus callback.
        const event = requestBlurCallback.getCall(0).args[0];
        event.should.be.ok();

        unmountEditableTextBox();
      });
    });

    describe('onFocus', () => {
      it('verify onFocus callback is fired when the onFocus event occurs', () => {
        const requestFocusCallback = sinon.spy();

        const editableTextBox = renderEditableTextBox({
          onFocus: requestFocusCallback
        });

        // focus the editor
        focusAt(editableTextBox.entry);
        requestFocusCallback.called.should.be.ok();

        // Check if event is passed to onFocus callback.
        const event = requestFocusCallback.getCall(0).args[0];
        event.should.be.ok();

        unmountEditableTextBox();
      });
    });

    describe('onKeyUp', () => {
      it('verify onKeyUp event does insert P tags if no text inputted', () => {
        const editableTextBox = renderEditableTextBox();

        // keyUp at the editor
        keyUpAt(editableTextBox.entry);

        editableTextBox.entry.innerHTML.should.be.eql('<p></p>');

        unmountEditableTextBox();
      });

      it('verify onKeyUp event does not insert P tags if text inputted', () => {
        const editableTextBox = renderEditableTextBox({
          defaultText: '<p>This is text</p>'
        });

        // keyUp at the editor
        keyUpAt(editableTextBox.entry);

        editableTextBox.entry.innerHTML.should.not.be.eql('<p></p>');

        unmountEditableTextBox();
      });
    });

    describe('onInput', () => {
      it('verify onInput callback is fired when the onInput event occurs', () => {
        const clock = useFakeTimers();

        const requestInputCallback = sinon.spy();

        const editableTextBox = renderEditableTextBox({
          onInput: requestInputCallback
        });

        inputAt(editableTextBox.entry);

        clock.tick(INPUT_WAIT_INTERVAL + INPUT_WAIT_INTERVAL);

        requestInputCallback.called.should.be.ok();

        unmountEditableTextBox();
      });
    });
  });

  describe('Methods', () => {
    describe('handleOnInput', () => {
      it('verify handleOnInput early return if on onInput prop not provided', () => {
        const requestInputCallback = sinon.spy();

        renderEditableTextBox();

        requestInputCallback.called.should.not.be.ok();

        unmountEditableTextBox();
      });

      it('verify handleOnInput returns correct object if onInput prop provided', () => {
        const clock = useFakeTimers();
        const requestInputCallback = sinon.spy();

        const editableTextBox = renderEditableTextBox({
          onInput: requestInputCallback
        });

        editableTextBox.handleOnInput(textStubs.html);

        clock.tick(INPUT_WAIT_INTERVAL + INPUT_WAIT_INTERVAL);

        const event = requestInputCallback.getCall(0).args[0];
        event.should.be.eql(stateStubs.html);

        unmountEditableTextBox();
      });
    });
  });
};
