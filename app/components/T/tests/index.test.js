/**
 *
 * Tests for T
 *
 */

import React from 'react';
import { getComponentStyles, renderProvider } from '@utils/testUtils';
import { T } from '../index';

describe('<T /> component tests', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<T />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 T component', () => {
    const { getAllByTestId } = renderProvider(<T />);
    expect(getAllByTestId('t').length).toBe(1);
  });

  it('should contain render the text according to the id', () => {
    const { getAllByText } = renderProvider(<T id="songs_list" />);
    expect(getAllByText(/Songs List/).length).toBe(1);
  });

  it('should have a margin-bottom of 5px when we pass marginBottom as 5', () => {
    const props = {
      marginBottom: 5,
      id: 'songs_list',
      theme: {
        primary: 'violet',
        secondary: 'red'
      }
    };
    const styles = getComponentStyles(T, props);
    expect(styles['margin-bottom']).toBe(`${props.marginBottom}px`);
  });
});
