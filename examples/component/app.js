import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { parse } from 'node-html-parser';
import { EditableTextBox } from 'react-editable-textbox';

const createElement = ({ props, children }) =>
  React.createElement('p', props, children);

const initialState = {
  component: [
    createElement({
      props: {
        key: 0
      }
    })
  ]
};

const allowedAttributes = ['style'];

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  convertToComponent = ({ childNodes }) =>
    childNodes.map((node, key) =>
      createElement({
        props: {
          key,
          style: {
            color: 'blue'
          }
        },
        children: node.text
      })
    );

  handleOnInput = ({ charCount, text }) => {
    if (!charCount) {
      return this.setState(initialState);
    }

    this.setState({
      component: this.convertToComponent(parse(text))
    });
  };

  render = () => (
    <EditableTextBox
      onInput={this.handleOnInput}
      allowedAttributes={allowedAttributes}
      onBlur={text => console.log('Blurred', text)}
      onFocus={text => console.log('Focussed', text)}
      aria={{
        'aria-placeholder': 'Content Editable Textbox',
        'aria-labelledby': 'contentEditableLabel'
      }}
      isGhost
    >
      {this.state.component}
    </EditableTextBox>
  );
}

const appElement = document.getElementById('example');
ReactDOM.render(<App />, appElement);
