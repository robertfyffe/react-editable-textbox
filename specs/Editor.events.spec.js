/* eslint-env mocha */
import should from 'should';
import sinon from 'sinon';

import { focusAt, blurAt, keyUpAt, renderEditableTextBox } from './helpers';

export default () => {
  it('verify handleEvent function returns correctly if callback passed', () => {
    const cb = sinon.spy();

    const editableTextBox = renderEditableTextBox();
    editableTextBox.handleEvent(cb);

    const event = cb.getCall(0).args[0];
    event.should.be.eql({
      charCount: 0,
      text: null
    });
  });

  it('verify onBlur callback is fired when the onBlur event occurs', () => {
    const requestBlurCallback = sinon.spy();

    const editableTextBox = renderEditableTextBox({
      onBlur: requestBlurCallback
    });

    // focus the editor
    blurAt(editableTextBox.editorEntry);
    requestBlurCallback.called.should.be.ok();

    // Check if event is passed to onFocus callback.
    const event = requestBlurCallback.getCall(0).args[0];
    event.should.be.ok();
  });

  it('verify onFocus callback is fired when the onFocus event occurs', () => {
    const requestFocusCallback = sinon.spy();

    const editableTextBox = renderEditableTextBox({
      onFocus: requestFocusCallback
    });

    // focus the editor
    focusAt(editableTextBox.editorEntry);
    requestFocusCallback.called.should.be.ok();

    // Check if event is passed to onFocus callback.
    const event = requestFocusCallback.getCall(0).args[0];
    event.should.be.ok();
  });

  it('verify keyUp event does insert P tags if no text inputted', () => {
    const editableTextBox = renderEditableTextBox();

    // keyUp at the editor
    keyUpAt(editableTextBox.editorEntry);

    editableTextBox.editorEntry.innerHTML.should.be.eql('<p></p>');
  });

  it('verify keyUp event does not insert P tags if text inputted', () => {
    const editableTextBox = renderEditableTextBox({
      defaultText: '<p>This is text</p>'
    });

    // keyUp at the editor
    keyUpAt(editableTextBox.editorEntry);

    editableTextBox.editorEntry.innerHTML.should.not.be.eql('<p></p>');
  });
};
