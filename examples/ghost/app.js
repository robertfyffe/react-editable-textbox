import React from 'react';
import ReactDOM from 'react-dom';
import { EditableTextBox } from 'react-editable-textbox';

const defaultText = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Suspendisse maximus felis ut mauris mattis tempor. Ut suscipit aliquet est 
                    non sagittis. Fusce lobortis sodales nulla, tincidunt ornare massa vehicula id. 
                    Vivamus sit amet tellus quis risus ultrices iaculis. Praesent a porttitor nisi. 
                    Maecenas vitae aliquam sapien.</p>`;

const App = () => <EditableTextBox defaultText={defaultText} isGhost />;

const appElement = document.getElementById('example');
ReactDOM.render(<App />, appElement);
