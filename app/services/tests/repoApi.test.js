import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSongs } from '../repoApi';

describe('RepoApi tests', () => {
  const artistName = 'rihana';
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient('itune').axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ artistName }]
      }
    ];
    mock
      .onGet(`/search?term=${artistName}&types=artists songs limit[results%3AtopResults]=10&l=en-us`)
      .reply(200, data);
    const res = await getSongs(artistName);
    expect(res.data).toEqual(data);
  });
});
