import React from 'react';
import { renderProvider } from '@utils/testUtils';
import Card from '../index';

describe('<Card>', () => {
  it('should render and match snapshot', () => {
    const { baseElement } = renderProvider(<Card />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain artist name', () => {
    const { getByTestId } = renderProvider(<Card />);
    expect(getByTestId('card')).toBeTruthy();
  });
});
