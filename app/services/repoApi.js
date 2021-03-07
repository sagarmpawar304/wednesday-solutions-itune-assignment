import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');
const itunesAPI = generateApiClient('itune');

export const getRepos = repoName => repoApi.get(`/search/repositories?q=${repoName}`);

export const getSongs = (data = 'taylor swift') =>
  itunesAPI.get(`/search?term=${data}&types=artists songs limit[results%3AtopResults]=10&l=en-us`);
