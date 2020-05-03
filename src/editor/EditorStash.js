import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import propTypes from './propTypes';

const containerBaseStyles = () => css`
  display: none;
`;

const Container = styled('div')(containerBaseStyles);

const EditorStash = forwardRef(({ children }, ref) => (
  <Container ref={ref}>{children}</Container>
));

EditorStash.propTypes = propTypes.EditorStash;
EditorStash.displayName = 'EditorStash';

export default EditorStash;
