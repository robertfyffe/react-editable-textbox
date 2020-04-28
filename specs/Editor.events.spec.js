/* eslint-env mocha */
import should from 'should';
import sinon from 'sinon';

import { focusAt, renderEditableTextBox } from './helpers';

export default () => {
  it('verify onFocus event passing on editor click', () => {
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
};
