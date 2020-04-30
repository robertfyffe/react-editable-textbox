import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { parse } from 'node-html-parser';
import { EditableTextBox } from 'react-editable-textbox';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      component: null,
      html: null
    };
  }

  convertToComponent = ({ childNodes }, props) =>
    childNodes.map((node, key) =>
      React.createElement(
        'p',
        {
          key,
          style: {
            color: 'red'
          }
        },
        node.text
      )
    );

  handleOnInput = resp =>
    this.setState({
      component: this.convertToComponent(parse(resp.text))
    });

  handleOnBlur = () =>
    this.setState({
      html: this.state.component
    });

  render = () => {
    const { html } = this.state;

    return (
      <div style={{ maxWidth: '400px' }}>
        <EditableTextBox
          html={html}
          onInput={this.handleOnInput}
          onBlur={this.handleOnBlur}
          allowedTags={['p', 'span']}
          allowedAttributes={['href', 'style']}
          isGhost
        />
      </div>
    );
  };
}

const appElement = document.getElementById('example');
ReactDOM.render(<App />, appElement);
