import React from 'react';
import ReactDOM from 'react-dom';
import { EditableTextBox } from 'react-editable-textbox';

const App = () => <EditableTextBox />;

const appElement = document.getElementById('example');
ReactDOM.render(<App />, appElement);
