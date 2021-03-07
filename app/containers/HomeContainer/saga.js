import { put, call, takeLatest } from 'redux-saga/effects';
import { getSongs } from '@services/repoApi';
import { homeContainerTypes, homeContainerCreators } from './reducer';

const { REQUEST_GET_SONGS } = homeContainerTypes;
const { successGetSongs, failureGetSongs } = homeContainerCreators;
export function* getSongsList(action) {
  const response = yield call(getSongs, action.artistName);

  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(failureGetSongs(data));
  }
}
// Individual exports for testing
export default function* homeContainerSaga() {
  yield takeLatest(REQUEST_GET_SONGS, getSongsList);
}
