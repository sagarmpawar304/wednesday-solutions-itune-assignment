import { selectHomeContainer, selectArtistName, selectSongsData, selectSongsError } from '../selectors';

describe('HomeContainer selector tests', () => {
  let mockedState;
  let artistName;
  let data;
  let error;

  beforeEach(() => {
    artistName = 'rihana';
    data = { resultCount: 1, results: [{ artistName }] };
    error = 'There was some error while fetching the repository details';

    mockedState = {
      homeContainer: {
        artistName,
        data,
        error
      }
    };
  });
  it('should select the homeContainer state', () => {
    const homeContainerSelector = selectHomeContainer();
    expect(homeContainerSelector(mockedState)).toEqual(mockedState.homeContainer);
  });
  it('should select the artistName', () => {
    const artistSelector = selectArtistName();
    expect(artistSelector(mockedState)).toEqual(artistName);
  });

  it('should select data', () => {
    const songsDataSelector = selectSongsData();
    expect(songsDataSelector(mockedState)).toEqual(data);
  });

  it('should select the error', () => {
    const songsErrorSelector = selectSongsError();
    expect(songsErrorSelector(mockedState)).toEqual(error);
  });
});
