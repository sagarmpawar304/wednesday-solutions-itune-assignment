import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectHomeContainerDomain = state => state.homeContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectHomeContainer = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => substate
  );

export const selectSongsData = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'data', null)
  );

export const selectSongsError = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'error', null)
  );

export const selectArtistName = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'artistName', null)
  );

export default selectHomeContainer;
