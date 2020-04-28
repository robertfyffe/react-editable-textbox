import React from 'react';
import ReactDOM from 'react-dom';
import { EditableTextBox } from 'react-editable-textbox';
import TestUtils from 'react-dom/test-utils';

const divStack = [];

const { Simulate } = TestUtils;

/**
 * Dispatch a 'click' event at a node.
 */
export const clickAt = Simulate.click;

/**
 * Dispatch a 'focus' event at a node.
 */
export const focusAt = Simulate.focus;

/**
 * Dispatch a 'blur' event at a node.
 */
export const blurAt = Simulate.blur;

/**
 *
 * Return an element from a react component.
 * @param {React} A react instance.
 * @return {DOMElement}
 */
const editableTextBoxComponent = (component) => (instance) => {
  console.log(instance[component]);
  return instance[component];
};

/**
 * Returns an attribut of a rendered react tree.
 * @param {React} component A react instance.
 * @return {String}
 */
const getEditableTextBoxAttribute = (component) => (instance, attr) =>
  editableTextBoxComponent(component)(instance).getAttribute(attr);

/**
 * Return an attribute of editable text box.
 * @param {EditableTextBox} editor EditableTextBox instance.
 * @return {String}
 */
export const contentAttribute = (content) =>
  getEditableTextBoxAttribute(content);

export const renderEditableTextBox = (props, callback) => {
  const editorProps = { ...props };

  const currentDiv = document.createElement('div');
  divStack.push(currentDiv);
  document.body.appendChild(currentDiv);

  // eslint-disable-next-line react/no-render-return-value
  return ReactDOM.render(
    <EditableTextBox {...editorProps} />,
    currentDiv,
    callback
  );
};
