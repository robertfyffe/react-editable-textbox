/* eslint-env mocha */
import should from 'should';

import { defaultTheme, themeSchema, userTheme, ghostTheme } from './helpers';
import { getTheme } from '../src/editor/utils';

const themeBuilder = ({ userTheme, isGhost } = {}) =>
  getTheme({
    themes: {
      ...defaultTheme,
      user: userTheme || themeSchema
    },
    isGhost
  });

export default () => {
  describe('schema', () => {
    it('verify theme schema contains correct keys', () => {
      themeBuilder().should.have.keys('editor', 'placeholder', 'entry');
    });
  });

  describe('user', () => {
    it('verify user theme overrides default theme when provided', () => {
      themeBuilder().should.have.keys('editor', 'placeholder', 'entry');
      themeBuilder().should.not.containDeepOrdered(defaultTheme);
    });

    it('verify all user theme properties correctly overrides default theme properties', () => {
      themeBuilder({ userTheme }).should.have.keys(
        'editor',
        'placeholder',
        'entry'
      );
      themeBuilder({ userTheme }).should.containDeepOrdered(userTheme);
    });
  });

  describe('ghost', () => {
    it('verify ghost theme overrides default theme properties', () => {
      themeBuilder({}).should.have.keys('editor', 'placeholder', 'entry');
      themeBuilder({ isGhost: true }).should.containDeepOrdered(ghostTheme);
    });
  });
};
