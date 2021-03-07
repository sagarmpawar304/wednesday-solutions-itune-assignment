import { homeContainerReducer, initialState, homeContainerTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('HomContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(homeContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_GET_SONGS is dispatched', () => {
    const artistName = 'eminem';
    const expectedResult = { ...state, artistName };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.REQUEST_GET_SONGS,
        artistName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the songs data is present and userLoading = false when SUCCESS_GET_SONGS is dispatched', () => {
    const data = { resultCount: 50 };
    const expectedResult = { ...state, data };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.SUCCESS_GET_SONGS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_USER_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, error };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.FAILURE_GET_SONGS,
        error
      })
    ).toEqual(expectedResult);
  });
});
