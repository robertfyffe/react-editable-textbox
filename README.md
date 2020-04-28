# react-content-editable

Accessible contentEditable textbox for React.js

[![Build Status](https://travis-ci.com/robertfyffe/react-editable-textbox.svg?branch=master)](https://travis-ci.com/robertfyffe/react-editable-textbox)

## Table of Contents

- [Installation](#installation)
- [API documentation](#api-documentation)
- [Examples](#examples)

## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

    $ npm install @robertfyffe/react-editable-textbox
    $ yarn add @robertfyffe/react-editable-textbox

## API documentation

```jsx
<EditableTextBox
  theme={
    {
      editor: {
        background: '#f8d7da',
        borderRadius: '5px',
        fontSize: '16px',
        margin: '0 0 15px',
        padding: '6px 0 6px 10px',
        textSpacing: '0 0 15px',
        height: '33px'
      },
      editorPlaceholder: {
        color: '#721c24',
        fontSize: '16px',
        padding: '6px 0 6px 10px'
      },
      editorEntry: {
        borderColor: '#f5c6cb',
        focusBorderColor: '#5C656F',
        borderRadius: '5px',
        color: '#721c24',
        fontSize: '16px',
        padding: '6px 0 6px 10px',
        textSpacing: '0 0 15px',
        height: '33px',
        zIndex: 10
      }
    }
    /* Object indicating theme override styles to be used.
      It has three keys, `editor`, `editorPlaceholder` and `editorEntry`.
      The properties are fixed using this method of styling.
      If more precise styling is required use the styles prop. */
  }
  styles={
    {
      editorPlaceholder: {
        fontStyle: 'italic'
      },
      editorEntry: {
        borderWidth: '4px',
        outline: 0
      }
    }
    /* Object indicating custom styles to be used.
      It has three keys, `editor`, `editorPlaceholder` and `editorEntry`.
      All CSS properties can be passed. */
  }
  aria={
    {
      'aria-placeholder': 'Content Editable Textbox',
      'aria-labelledby': 'contentEditableLabel'
    }
    /* Aria attributes (optional). */
  }
  role={
    'textbox'
    /* String indicating the role of the textbox.
      This attribute is `textbox` by default. */
  }
  defaultText={
    'Default text...'
    /* String to set as the default text of the textbox. */
  }
  placeholder={
    'Placeholder text...'
    /* String to set as the placeholder text of the textbox. */
  }
  disabled={
    false
    /* Boolean describing if the textbox should be disabled. */
  }
  allowedTags={
    ['p']
    /* Array of allowed HTML tags for editor.
      This attribute is `['p']` by default. */
  }
  allowedAttributes={
    {
      a: ['href']
    }
    /* Array of allowed HTML attributes for editor.
      All attributes disabled` by default. */
  }
  onFocus={
    () => console.log('onFocus!')
    /* Function that will be run when the editor gains focus. */
  }
  onBlur={
    () => console.log('onBlur!')
    /* Function that will be run when the editor looses focus. */
  }
  onInput={
    () => console.log('onInput!')
    /* Function that will be run when text is inputted. */
  }
/>
```

## Examples

Here is a simple example of react-editable-textbox being used in an app:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { EditableTextBox } from '@robertfyffe/react-content-editable';

const App = () => <EditableTextBox />;

const appElement = document.getElementById('example');
ReactDOM.render(<App />, appElement);
```

You can find more examples in the `examples` directory, which you can run in a
local development server using `npm run start` or `yarn run start`.
