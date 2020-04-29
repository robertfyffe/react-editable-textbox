/* eslint-env mocha */
import should from 'should';

import { allThemes } from '../src/themes';
import { getTheme } from '../src/editor/utils';

export default () => {
  it('verify theme schema contains correct keys', () => {
    const theme = getTheme({
      themes: {
        ...allThemes,
        user: {
          editor: {},
          editorPlaceholder: {},
          editorEntry: {}
        }
      },
      isGhost: true
    });

    theme.should.have.keys('editor', 'editorPlaceholder', 'editorEntry');
  });
};
