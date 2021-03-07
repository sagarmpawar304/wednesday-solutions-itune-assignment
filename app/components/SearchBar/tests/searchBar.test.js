import React from 'react';
import { renderProvider } from '@utils/testUtils';
import SearchBar from '../index';

describe('<SearchBar>', () => {
  const onChange = jest.fn();
  const onSearch = jest.fn();
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SearchBar onChange={onChange} onSearch={onSearch} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain artist name', () => {
    const { getByTestId } = renderProvider(<SearchBar onChange={onChange} onSearch={onSearch} />);
    expect(getByTestId('search-bar')).toBeTruthy();
  });
});
