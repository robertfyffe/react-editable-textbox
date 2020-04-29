import React from 'react';
import ReactDOM from 'react-dom';
import { EditableTextBox } from 'react-editable-textbox';

const defaultText = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Suspendisse maximus felis ut mauris mattis tempor. Ut suscipit aliquet est 
                    non sagittis. Fusce lobortis sodales nulla, tincidunt ornare massa vehicula id. 
                    Vivamus sit amet tellus quis risus ultrices iaculis. Praesent a porttitor nisi. 
                    Maecenas vitae aliquam sapien. Pellentesque habitant morbi tristique senectus et 
                    netus et malesuada fames ac turpis egestas. Vivamus porttitor mattis facilisis. 
                    Cras eget porttitor quam. Quisque venenatis hendrerit arcu sit amet cursus. Praesent 
                    finibus, felis sed auctor placerat, lacus ante iaculis diam, in mattis purus ipsum 
                    nec lectus. Pellentesque sit amet sapien varius, pretium erat eget, faucibus massa. 
                    Ut eleifend placerat massa eu lacinia. Proin ut velit suscipit, congue nisl eget, 
                    tempus risus. Aliquam erat volutpat. Nullam nec varius nibh.</p>`;

const App = () => <EditableTextBox defaultText={defaultText} isGhost />;

const appElement = document.getElementById('example');
ReactDOM.render(<App />, appElement);
