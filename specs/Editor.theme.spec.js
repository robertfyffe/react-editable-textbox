/* eslint-env mocha */
import should from 'should';

import { allThemes } from '../src/themes';
import { getTheme } from '../src/editor/utils';

const themeSchema = {
  editor: {},
  editorPlaceholder: {},
  editorEntry: {}
};

const defaultTheme = allThemes;

const userTheme = {
  editor: {
    background: 'userProvided',
    borderRadius: 'userProvided',
    fontSize: 'userProvided',
    margin: 'userProvided',
    padding: 'userProvided',
    textSpacing: 'userProvided',
    height: 'userProvided'
  },
  editorPlaceholder: {
    color: 'userProvided',
    fontSize: 'userProvided',
    padding: 'userProvided'
  },
  editorEntry: {
    border: 'userProvided',
    focusBorderColor: 'userProvided',
    borderRadius: 'userProvided',
    color: 'userProvided',
    fontSize: 'userProvided',
    lineHeight: 'userProvided',
    padding: 'userProvided',
    textSpacing: 'userProvided',
    height: 'userProvided',
    zIndex: 'userProvided'
  }
};

const ghostTheme = allThemes.ghost;

const themeBuilder = ({ userTheme, isGhost } = {}) =>
  getTheme({
    themes: {
      ...defaultTheme,
      user: userTheme || themeSchema
    },
    isGhost
  });

export default () => {
  it('verify theme schema contains correct keys', () => {
    themeBuilder().should.have.keys(
      'editor',
      'editorPlaceholder',
      'editorEntry'
    );
  });

  it('verify user theme overrides default theme when provided', () => {
    themeBuilder().should.have.keys(
      'editor',
      'editorPlaceholder',
      'editorEntry'
    );
    themeBuilder().should.not.containDeepOrdered(defaultTheme);
  });

  it('verify all user theme properties correctly overrides default theme properties', () => {
    themeBuilder({ userTheme }).should.have.keys(
      'editor',
      'editorPlaceholder',
      'editorEntry'
    );
    themeBuilder({ userTheme }).should.containDeepOrdered(userTheme);
  });

  it('verify ghost theme overrides default theme properties', () => {
    themeBuilder({}).should.have.keys(
      'editor',
      'editorPlaceholder',
      'editorEntry'
    );
    themeBuilder({ isGhost: true }).should.containDeepOrdered(ghostTheme);
  });
};
