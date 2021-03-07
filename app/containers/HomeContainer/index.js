import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Row, Col } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import T from '@components/T';
import { useInjectSaga } from 'utils/injectSaga';
import { selectHomeContainer, selectSongsData, selectSongsError, selectArtistName } from './selectors';
import { homeContainerCreators } from './reducer';
import saga from './saga';

import SongsCard from '@components/Card/index';
import SearchComponent from '@components/SearchBar/index';
import media from '@app/themes/media';

// const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    color: ${props => props.theme.secondary};
  }
`;

const TopCard = styled(Card)`
  && {
    margin: 2rem auto !important;
    color: ${props => props.theme.secondary};
    .ant-card-body {
      padding: 0 !important;
    }
    background-color: transparent !important;
    border: transparent;
    width: 100%;
    ${media.desktop.min(`
      max-width: 40vw;
    `)}
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
  }
`;

export function HomeContainer({
  dispatchSongsData,
  dispatchClearSongsData,
  intl,
  data = {},
  error = null,
  artistName
}) {
  useInjectSaga({ key: 'homeContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(data, 'results', null) || error;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (artistName && !data?.results?.length) {
      dispatchSongsData(artistName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = rName => {
    if (!isEmpty(rName)) {
      dispatchClearSongsData();
      dispatchSongsData(rName);
      setLoading(true);
    } else {
      dispatchClearSongsData();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderRepoList = () => {
    const results = get(data, 'results', []);
    const resultCount = get(data, 'resultCount', 0);

    return (
      (results.length !== 0 || loading) && (
        <Row gutter={16}>
          <Skeleton loading={loading} active>
            <Col span={24}>
              {artistName && (
                <div>
                  <T id="search_query" values={{ artistName }} />
                </div>
              )}
              {resultCount !== 0 && (
                <div>
                  <T id="matching_results" values={{ resultCount }} />
                </div>
              )}
            </Col>
            {results.map((item, index) => (
              <Col key={index} xs={24} md={12} lg={8}>
                <SongsCard data={item} />
              </Col>
            ))}
          </Skeleton>
        </Row>
      )
    );
  };
  const renderErrorState = () => {
    let songsError;
    if (error) {
      songsError = error;
    } else if (!get(data, 'resultCount', 0)) {
      songsError = 'songs_search_default';
    }
    return (
      !loading &&
      songsError && (
        <CustomCard color={error ? 'red' : 'grey'} title={intl.formatMessage({ id: 'songs_list' })}>
          <T id={songsError} />
        </CustomCard>
      )
    );
  };

  return (
    <Container>
      <TopCard>
        <SearchComponent
          data-testid="search-bar"
          defaultValue={artistName}
          type="text"
          placeholder="Search Songs by artist name"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </TopCard>
      {renderRepoList()}
      {renderErrorState()}
    </Container>
  );
}

HomeContainer.propTypes = {
  dispatchSongsData: PropTypes.func,
  dispatchClearSongsData: PropTypes.func,
  intl: PropTypes.object,
  data: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  error: PropTypes.object,
  artistName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

HomeContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  homeContainer: selectHomeContainer(),
  data: selectSongsData(),
  error: selectSongsError(),
  artistName: selectArtistName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSongs, clearSongs } = homeContainerCreators;
  return {
    dispatchSongsData: artistName => dispatch(requestGetSongs(artistName)),
    dispatchClearSongsData: () => dispatch(clearSongs())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
