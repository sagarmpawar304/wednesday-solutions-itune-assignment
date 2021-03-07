/* eslint-disable prettier/prettier */
import React from 'react';
import { Card, Avatar } from 'antd';
import propTypes from 'prop-types';
import styled from 'styled-components';

import { colors, styles, fonts } from '@themes';
const { boxShadow, borderRadius } = styles;

const { Meta } = Card;

export const song = {
  artistId: 159260351,
  artistName: 'Taylor Swift',
  artistViewUrl: 'https://music.apple.com/us/artist/taylor-swift/159260351?uo=4',
  artworkUrl30:
    'https://is5-ssl.mzstatic.com/image/thumb/Music128/v4/9c/91/83/,9c918303-e0a4-2d4b-97d6-f986b9fba604/source/30x30bb.jpg',
  artworkUrl60:
    'https://is5-ssl.mzstatic.com/image/thumb/Music128/v4/9c/91/83/,9c918303-e0a4-2d4b-97d6-f986b9fba604/source/60x60bb.jpg',
  artworkUrl100:
    'https://is5-ssl.mzstatic.com/image/thumb/Music128/v4/9c/91/83/9c918303-e0a4-2d4b-97d6-f986b9fba604/source/100x100bb.jpg',
  collectionCensoredName: '1989',
  collectionExplicitness: 'notExplicit',
  collectionId: 1440935467,
  collectionName: '1989',
  collectionPrice: 10.99,
  collectionViewUrl: 'https://music.apple.com/us/album/shake-it-off/1440935467?i=1440936016&uo=4',
  country: 'USA',
  currency: 'USD',
  discCount: 1,
  discNumber: 1,
  isStreamable: true,
  kind: 'song',
  previewUrl:
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/4d/80/bb/      4d80bb0d-5b66-7c09-056c-4dbae131e0c4/mzaf_6323814923022681502.plus.aac.p.m4a',
  primaryGenreName: 'Pop',
  releaseDate: '2014-08-18T12:00:00Z',
  trackCensoredName: 'Shake It Off',
  trackCount: 13,
  trackExplicitness: 'notExplicit',
  trackId: 1440936016,
  trackName: 'Shake It Off',
  trackNumber: 6,
  trackPrice: 1.29,
  trackTimeMillis: 219209,
  trackViewUrl: 'https://music.apple.com/us/album/shake-it-off/1440935467?i=1440936016&uo=4',
  wrapperType: 'track'
};

const CustomCard = ({ data, className, avatarShape, avatarSize }) => {
  const { trackName, artistName, artworkUrl100 } = data;
  return (
    <CardWrapper className={className} data-testid="card">
      <Meta
        avatar={<Avatar src={artworkUrl100} shape={avatarShape} size={avatarSize}  />}
        title={artistName}
        description={trackName}
      />
    </CardWrapper>
  );
};

CustomCard.propTypes = {
  data: propTypes.shape({
    artistId: propTypes.number,
    artistName: propTypes.string.isRequired,
    trackName: propTypes.string.isRequired,
    artworkUrl100: propTypes.string.isRequired,
    releaseDate: propTypes.string.isRequired
  }),
  className: propTypes.string,
  avatarShape: propTypes.string,
  avatarSize: propTypes.number
};

CustomCard.defaultProps = {
  data: song,
  avatarShape: 'square',
  avatarSize: 70
};

const CardWrapper = styled(Card)`
  min-width: 320px;
  ${styles.margin.vertical(1)};
  background-color: ${props => props.theme.primary || colors.primary} !important;
  ${borderRadius(8)}
  .ant-card-body {
    padding: 12px;
    overflow: hidden;
  }

  .ant-card-meta {
    ${styles.flexConfig.row()};
    padding: 0.5rem 0.5rem;
    align-items: center;
    overflow: hidden;
  }

  .ant-card-meta-avatar {
    height: 100%;
  }

  .ant-avatar-image {
    ${borderRadius(8)}
  }

  .ant-card-meta-title {
    ${fonts.dynamicFontSize(fonts.size.regular, 0.1, 0.1)}
    ${styles.margin.bottom()}
        color: ${props => props.theme.secondary || colors.secondary} !important;

  }

  .ant-card-meta-description {
      color: ${props => props.theme.secondary || colors.secondary} !important;
    
  }

  transition: all 0.5s linear;
  ${boxShadow(8, 8, 8, 0, props => props.theme.secondary)};

  &:hover {
    ${boxShadow(8, 8, 8, 0, props => props.theme.primary)}
  }
`;

export default CustomCard;
