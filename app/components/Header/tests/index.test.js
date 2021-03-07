/**
 *
 * Tests for Header
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
import Header from '../index';

describe('<Card />', () => {
  it('should contain logo', () => {
    const { getAllByAltText } = renderProvider(<Header />);
    expect(getAllByAltText('logo').length).toBe(1);
  });
});
