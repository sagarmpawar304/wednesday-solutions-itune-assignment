/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: homeContainerTypes, Creators: homeContainerCreators } = createActions({
  requestGetSongs: ['artistName'],
  successGetSongs: ['data'],
  failureGetSongs: ['error'],
  clearSongs: []
});
export const initialState = { artistName: null, data: [], error: null };

/* eslint-disable default-case, no-param-reassign */
export const homeContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case homeContainerTypes.REQUEST_GET_SONGS:
        draft.artistName = action.artistName;
        break;
      case homeContainerTypes.CLEAR_SONGS:
        return initialState;
      case homeContainerTypes.SUCCESS_GET_SONGS:
        draft.data = action.data;
        break;
      case homeContainerTypes.FAILURE_GET_SONGS:
        draft.error = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default homeContainerReducer;
