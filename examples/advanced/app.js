import React from 'react';
import ReactDOM from 'react-dom';
import { EditableTextBox } from 'react-editable-textbox';

const App = () => (
  <EditableTextBox
    theme={{
      editor: {
        background: 'white',
        borderRadius: '10px',
        margin: '0 0 15px',
        padding: '6px 0 6px 10px',
        textSpacing: '0 0 15px',
        height: '100px'
      },
      placeholder: {
        color: 'rgba(0,0,0,.4)',
        fontSize: '24px',
        padding: '10px 0 6px 14px'
      },
      entry: {
        border: '0',
        borderRadius: '10px',
        color: 'rgba(0,0,0,.7)',
        fontSize: '24px',
        lineHeight: '21px',
        padding: '16px 0 6px 10px',
        textSpacing: '0 0 15px',
        height: '100px',
        zIndex: 10
      }
    }}
    styles={{
      placeholder: {
        fontStyle: 'italic'
      },
      entry: {
        borderWidth: '4px',
        outline: 0,
        textShadow: '0 1px 5px rgba(0, 0, 0, 0.1)'
      }
    }}
    aria={{
      'aria-placeholder': 'Content Editable Textbox',
      'aria-labelledby': 'contentEditableLabel'
    }}
    role={'textbox'}
    defaultText={'<p>This is an example with default text...</p>'}
    placeholder={'Placeholder text...'}
    disabled={false}
    allowedTags={['p']}
    allowedAttributes={['style']}
    onFocus={resp => console.log(resp)}
    onBlur={resp => console.log(resp)}
    onInput={resp => console.log(resp)}
  />
);

const appElement = document.getElementById('example');
ReactDOM.render(<App />, appElement);
