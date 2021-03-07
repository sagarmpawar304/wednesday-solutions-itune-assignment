/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '@services/repoApi';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getSongsList } from '../saga';
import { homeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  const artistName = 'enrique';
  let getSongsListGenerator = getSongsList({ artistName });

  it('should start task to watch for REQUEST_GET_SONGS action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_SONGS, getSongsList));
  });

  it('should ensure that the action FAILURE_GET_SONGS is dispatched when the api call fails', () => {
    const res = getSongsListGenerator.next().value;
    expect(res).toEqual(call(getSongs, artistName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching songs.'
    };
    expect(getSongsListGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_SONGS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_SONGS is dispatched when the api call succeeds', () => {
    getSongsListGenerator = getSongsList({ artistName });
    const res = getSongsListGenerator.next().value;
    expect(res).toEqual(call(getSongs, artistName));
    const songsResponse = {
      resultCount: 1,
      results: [{ artistName: artistName }]
    };
    expect(getSongsListGenerator.next(apiResponseGenerator(true, songsResponse)).value).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_SONGS,
        data: songsResponse
      })
    );
  });
});
