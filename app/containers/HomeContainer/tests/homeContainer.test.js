/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { HomeContainerTest as HomeContainer } from '../index';

describe('<HomeContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<HomeContainer dispatchSongsData={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchSongsData on change', async () => {
    const { getByTestId } = renderProvider(<HomeContainer dispatchSongsData={submitSpy} />);
    // expect(getByTestId('search-bar').toBeTruthy());
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'taylor swift' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should call dispatchClearSongs on empty change', async () => {
    const getSongsSpy = jest.fn();
    const clearSongsSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <HomeContainer dispatchClearSongsData={clearSongsSpy} dispatchSongsData={getSongsSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getSongsSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearSongsSpy).toBeCalled();
  });
});
