/* eslint-env mocha */
import should from 'should';
import sinon from 'sinon';

import { elements } from '../src/editor/constants';
import { defaultTheme, userTheme, renderEditableTextBox } from './helpers';
import * as utils from '../src/editor/utils';

const { CONTAINER, PLACEHOLDER, ENTRY, STASH } = elements;

const textStubs = {
  noHtml: 'This is text...',
  html: '<p>This is text...</p>',
  attack: '<p>This <script>is</script> text</p>'
};

const stateStubs = {
  noHtml: {
    text: textStubs.noHtml,
    charCount: 15
  },
  html: {
    text: textStubs.html,
    charCount: 15
  },
  attack: {
    text: textStubs.attack,
    charCount: 15
  },
  empty: {
    text: null,
    charCount: 0
  }
};

const parseStub = {
  default: {
    allowedAttributes: [],
    allowedTags: ['p']
  },
  clean: {
    allowedAttributes: [],
    allowedTags: []
  }
};

const elementStubs = {
  container: CONTAINER,
  placeholder: PLACEHOLDER,
  entry: ENTRY,
  stash: STASH
};

const handlersStub = {
  onFocus: () => {},
  onBlur: () => {},
  onInput: () => {},
  onKeyUp: () => {}
};

export default () => {
  describe('publishEvent', () => {
    it('verify publishEvent correctly fires event provided', () => {
      const requestCallback = sinon.spy();
      utils.publishEvent(null, requestCallback);
      requestCallback.called.should.be.ok();
    });

    it('verify publishEvent correctly fires event and returns correctly when state is provided', () => {
      const requestCallback = sinon.spy();
      utils.publishEvent(stateStubs.html, requestCallback);
      const resp = requestCallback.getCall(0).args[0];
      resp.should.be.eql(stateStubs.html);
    });
  });

  describe('handleGetText', () => {
    it('verify handleGetText correctly returns text when provided', () => {
      const isEmpty = true;
      const text = '<p>This is text...</p>';
      const getText = utils.handleGetText(isEmpty);
      const resp = getText(text);
      resp.should.be.eql(text);
    });

    it('verify handleGetText correctly returns null when notEmpty is false', () => {
      const isEmpty = false;
      const text = '<p>This is text...</p>';
      const getText = utils.handleGetText(isEmpty);
      const resp = getText(text);
      should.not.exist(resp);
    });
  });

  describe('getEventProps', () => {
    it('verify getEventProps correctly returns cleaned text when no props provided', () => {
      const resp = utils.getEventProps({ inputValue: textStubs.html });
      resp.should.be.eql(stateStubs.noHtml);
    });

    it('verify getEventProps correctly returns formatted text when props provided', () => {
      const resp = utils.getEventProps({
        props: parseStub,
        inputValue: textStubs.html
      });
      resp.should.be.eql(stateStubs.html);
    });

    it('verify getEventProps correctly returns the correct object when NO text is provided', () => {
      const resp = utils.getEventProps();
      resp.should.be.eql(stateStubs.empty);
    });

    it('verify getEventProps correctly returns the correct object when props are provided without text', () => {
      const resp = utils.getEventProps({ props: parseStub });
      resp.should.be.eql(stateStubs.empty);
    });
  });

  describe('getCharCount', () => {
    it('verify getCharCount returns 0 when NO text provided', () => {
      const resp = utils.getCharCount();
      resp.should.be.eql(0);
    });

    it('verify getCharCount returns 15 when text is provided', () => {
      const resp = utils.getCharCount(textStubs.noHtml);
      resp.should.be.eql(15);
    });

    it('verify getCharCount returns 15 when text is provided with HTML', () => {
      const resp = utils.getCharCount(textStubs.html);
      resp.should.be.eql(15);
    });
  });

  // Updates keys
  describe('getTheme', () => {
    it('verify getTheme returns the correct schema', () => {
      const resp = utils.getTheme({
        themes: {
          ...defaultTheme,
          user: userTheme
        },
        isGhost: true
      });
      resp.should.have.keys('editor', 'editorPlaceholder', 'editorEntry');
    });
  });

  describe('propManager', () => {
    it('verify propManager returns the correct schema', () => {
      const resp = utils.propManager({
        elements: elementStubs,
        handlers: handlersStub,
        props: {}
      });
      resp.should.have.keys('container', 'placeholder', 'entry', 'stash');
    });
  });

  describe('publishOnInput', () => {
    it('verify publishOnInput returns the correct schema', () => {
      const resp = utils.publishOnInput({
        parse: parseStub,
        charCount: 15,
        text: textStubs.html,
        onInput: () => {}
      });
      resp.should.not.have.keys('container', 'placeholder', 'entry', 'stash');
    });
  });

  describe('replaceCaret', () => {
    it('verify replaceCaret returns early if no element provided', () => {
      renderEditableTextBox();
      const resp = utils.replaceCaret();
      should.not.exist(resp);
    });

    it('verify replaceCaret returns early if element not focused', () => {
      const editableTextBox = renderEditableTextBox();
      const resp = utils.replaceCaret(editableTextBox.entry);
      should.not.exist(resp);
    });
  });
};
