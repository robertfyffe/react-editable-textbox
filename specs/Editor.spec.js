/* eslint-env mocha */
import {
  contentAttribute,
  renderEditableTextBox,
  unmountEditableTextBox
} from './helpers';

export default () => {
  describe('Public API', () => {
    describe('Default props', () => {
      it('aria should be {}', () => {
        const editableTextBox = renderEditableTextBox();
        const { props } = editableTextBox;

        props.aria.should.be.eql({});

        unmountEditableTextBox();
      });
      it('styles should be {}', () => {
        const editableTextBox = renderEditableTextBox();
        const { props } = editableTextBox;

        props.styles.should.be.eql({});

        unmountEditableTextBox();
      });
      it('theme should be {}', () => {
        const editableTextBox = renderEditableTextBox();
        const { props } = editableTextBox;

        props.theme.should.be.eql({});

        unmountEditableTextBox();
      });
      it('role should be textbox', () => {
        const editableTextBox = renderEditableTextBox();
        const { props } = editableTextBox;

        props.placeholder.should.be.eql('Placeholder text...');

        unmountEditableTextBox();
      });
      it('placeholder should be `Placeholder text...`', () => {
        const editableTextBox = renderEditableTextBox();
        const { props } = editableTextBox;

        props.placeholder.should.be.eql('Placeholder text...');

        unmountEditableTextBox();
      });
      it(`defaultText should be null`, () => {
        const editableTextBox = renderEditableTextBox();
        const { props } = editableTextBox;

        should.not.exist(props.defaultText);

        unmountEditableTextBox();
      });
      it(`isGhost should be false`, () => {
        const editableTextBox = renderEditableTextBox();
        const { props } = editableTextBox;

        props.isGhost.should.be.eql(false);

        unmountEditableTextBox();
      });
      it('allowedAttributes should be []', () => {
        const editableTextBox = renderEditableTextBox();
        const { props } = editableTextBox;

        props.allowedAttributes.should.be.eql([]);

        unmountEditableTextBox();
      });
      it(`allowedTags should be ['p']`, () => {
        const editableTextBox = renderEditableTextBox();
        const { props } = editableTextBox;

        props.allowedTags.should.be.eql(['p']);

        unmountEditableTextBox();
      });
      it('disabled should be false', () => {
        const editableTextBox = renderEditableTextBox();
        const { props } = editableTextBox;

        props.disabled.should.not.be.ok();

        unmountEditableTextBox();
      });
    });

    describe('Provided Props', () => {
      it('aria-placeholder should be `Content Editable Textbox`', () => {
        const editableTextBox = renderEditableTextBox({
          aria: {
            'aria-placeholder': 'Content Editable Textbox'
          }
        });

        contentAttribute('entry')(
          editableTextBox,
          'aria-placeholder'
        ).should.be.eql('Content Editable Textbox');

        unmountEditableTextBox();
      });
      it('aria-labelledby should be `contentEditableLabel`', () => {
        const editableTextBox = renderEditableTextBox({
          aria: {
            'aria-labelledby': 'contentEditableLabel'
          }
        });

        contentAttribute('entry')(
          editableTextBox,
          'aria-labelledby'
        ).should.be.eql('contentEditableLabel');

        unmountEditableTextBox();
      });

      it('styles should be {...}', () => {
        const editableTextBox = renderEditableTextBox({
          styles: {
            editorPlaceholder: {
              fontStyle: 'italic'
            },
            editorEntry: {
              borderWidth: '4px',
              outline: 0
            }
          }
        });

        editableTextBox.props.styles.should.be.eql({
          editorPlaceholder: {
            fontStyle: 'italic'
          },
          editorEntry: {
            borderWidth: '4px',
            outline: 0
          }
        });

        unmountEditableTextBox();
      });
      it('theme should be {...}', () => {
        const editableTextBox = renderEditableTextBox({
          theme: {
            editor: {
              background: '#f8d7da',
              borderRadius: '5px',
              fontSize: '16px',
              margin: '0 0 15px',
              padding: '6px 0 6px 10px',
              textSpacing: '0 0 15px',
              height: '33px'
            }
          }
        });

        editableTextBox.props.theme.should.be.eql({
          editor: {
            background: '#f8d7da',
            borderRadius: '5px',
            fontSize: '16px',
            margin: '0 0 15px',
            padding: '6px 0 6px 10px',
            textSpacing: '0 0 15px',
            height: '33px'
          }
        });

        unmountEditableTextBox();
      });
      it('role should be button', () => {
        const editableTextBox = renderEditableTextBox({
          role: 'button'
        });

        contentAttribute('entry')(editableTextBox, 'role').should.be.eql(
          'button'
        );

        unmountEditableTextBox();
      });
      it('placeholder should be `Placeholder provided`', () => {
        const editableTextBox = renderEditableTextBox({
          placeholder: 'Placeholder provided'
        });

        editableTextBox.props.placeholder.should.be.eql('Placeholder provided');

        unmountEditableTextBox();
      });
      it('defaultText should be `Default text provided`', () => {
        const editableTextBox = renderEditableTextBox({
          defaultText: 'Default text provided'
        });

        editableTextBox.props.defaultText.should.be.eql(
          'Default text provided'
        );

        unmountEditableTextBox();
      });
      it(`isGhost should be true`, () => {
        const editableTextBox = renderEditableTextBox({
          isGhost: true
        });

        editableTextBox.props.isGhost.should.be.eql(true);

        unmountEditableTextBox();
      });
      it(`allowedAttributes should be ['style']`, () => {
        const editableTextBox = renderEditableTextBox({
          allowedAttributes: ['style']
        });

        editableTextBox.props.allowedAttributes.should.be.eql(['style']);

        unmountEditableTextBox();
      });
      it(`allowedTags should be ['p', 'span']`, () => {
        const editableTextBox = renderEditableTextBox({
          allowedTags: ['p', 'span']
        });

        editableTextBox.props.allowedTags.should.be.eql(['p', 'span']);

        unmountEditableTextBox();
      });

      it('disabled should be true', () => {
        const editableTextBox = renderEditableTextBox({ disabled: true });

        editableTextBox.props.disabled.should.be.ok();

        unmountEditableTextBox();
      });
    });
  });

  describe('State', () => {
    describe('charCount', () => {
      it('verify charCount is zero if text empty', () => {
        const editableTextBox = renderEditableTextBox();
        editableTextBox.state.charCount.should.be.eql(0);
        unmountEditableTextBox();
      });

      it('verify charCount is 12 if default text is provided with length 12', () => {
        const editableTextBox = renderEditableTextBox({
          defaultText: 'This is text'
        });
        editableTextBox.state.charCount.should.be.eql(12);
        unmountEditableTextBox();
      });

      // eslint-disable-next-line max-len
      it('verify charCount is 12 if default text with length 12 is provided with extra HTML elements', () => {
        const editableTextBox = renderEditableTextBox({
          defaultText: '<p>This is text</p>'
        });
        editableTextBox.state.charCount.should.be.eql(12);
        unmountEditableTextBox();
      });

      it('verify charCount is 12 if text of length 12 is manually inputted', () => {
        const editableTextBox = renderEditableTextBox();
        editableTextBox.handleOnInput('This is text');
        editableTextBox.state.charCount.should.be.eql(12);
        unmountEditableTextBox();
      });
    });
  });

  describe('Formatting', () => {
    describe('<p>', () => {
      it('verify editor contains empty <p> tags if no default text is provided', () => {
        const editableTextBox = renderEditableTextBox({ defaultText: '' });
        editableTextBox.entry.innerHTML.should.be.eql('<p></p>');
        unmountEditableTextBox();
      });

      it('verify editor contains empty <p> tags if no default text is provided', () => {
        const editableTextBox = renderEditableTextBox();
        editableTextBox.setInnerHTML(15, 'This is text...');
        editableTextBox.entry.innerHTML.should.be.eql('This is text...');
        unmountEditableTextBox();
      });
    });
  });

  describe('Methods', () => {
    describe('getProps', () => {
      it('verify getProps returns the correct props for entry element', () => {
        const editableTextBox = renderEditableTextBox();
        const resp = editableTextBox.getProps('entry');
        resp.should.have.keys(
          'customStyling',
          'onInput',
          'onKeyUp',
          'ref',
          'role'
        );
        unmountEditableTextBox();
      });
    });
  });
};
