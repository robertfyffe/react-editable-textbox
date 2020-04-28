import React from 'react';
import ReactDOM from 'react-dom';
import { EditableTextBox } from 'react-editable-textbox';

const App = () => (
  <EditableTextBox
    theme={{
      editor: {
        background: '#d1ecf1',
        borderRadius: '5px',
        fontSize: '16px',
        margin: '0 0 15px',
        padding: '6px 0 6px 10px',
        textSpacing: '0 0 15px',
        height: '33px'
      },
      editorPlaceholder: {
        color: '#57a1ae',
        fontSize: '16px',
        padding: '10px 0 6px 14px'
      },
      editorEntry: {
        borderColor: '#bee5eb',
        focusBorderColor: '#0c5460',
        borderRadius: '5px',
        color: '#0c5460',
        fontSize: '16px',
        padding: '6px 0 6px 10px',
        textSpacing: '0 0 15px',
        height: '33px',
        zIndex: 10
      }
    }}
    styles={{
      editorPlaceholder: {
        fontStyle: 'italic'
      },
      editorEntry: {
        borderWidth: '4px',
        outline: 0
      }
    }}
    aria={{
      'aria-placeholder': 'Content Editable Textbox',
      'aria-labelledby': 'contentEditableLabel'
    }}
    role={'textbox'}
    defaultText={'<p>This is an example with default text.</p>'}
    placeholder={'Placeholder text...'}
    disabled={false}
    allowedTags={['p']}
    allowedAttributes={{
      a: ['href']
    }}
    onFocus={(text) => {}}
    onBlur={(text) => {}}
    onInput={(text) => {}}
  />
);

const appElement = document.getElementById('example');
ReactDOM.render(<App />, appElement);
