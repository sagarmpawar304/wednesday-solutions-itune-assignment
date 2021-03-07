import { css } from 'styled-components';
import { colors } from '@app/themes';

const configureFlex = (
  direction = 'row',
  justifyContent = 'center',
  alignItems = 'center',
  alignContent = 'center',
  flexBasis = 0,
  flexGrow = 1,
  flexShrink = 0
) => css`
  ${direction === 'row' ? row() : column()}
  flex-direction: ${direction};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  align-content: ${alignContent};
  flex-basis: ${flexBasis};
  flex-grow: ${flexGrow};
  flex-shrink: ${flexShrink};
`;

const row = () => css`
  display: flex;
  flex: 1;
  flex-direction: row;
`;
const column = () => css`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const rowCenter = () => css`
  ${configureFlex('row', 'center', 'center', 'center')};
`;

const unequalColumns = () => css`
  ${configureFlex('column', '', '', '', 0, 0, 0)};
`;

const height = (height = 4) => css`
  height: ${height}rem;
`;

const top = (marginTop = 0) =>
  css`
    margin-top: ${marginTop}rem;
  `;

const bottom = (marginBottom = 0) =>
  css`
    margin-bottom: ${marginBottom}rem !important;
  `;

const left = (marginLeft = 0) =>
  css`
    margin-left: ${marginLeft}rem !important;
  `;

const right = (marginRight = 0) =>
  css`
    margin-right: ${marginRight}rem !important;
  `;

const vertical = (verticalMargin = 0) => css`
  margin-top: ${verticalMargin}rem !important;
  margin-bottom: ${verticalMargin}rem !important;
`;

const horizontal = (horizontalMargin = 0) => css`
  margin-left: ${horizontalMargin}rem !important;
  margin-right: ${horizontalMargin}rem !important;
`;

const borderRadiusBottom = (bottomRadius = 0) => css`
  border-bottom-left-radius: ${bottomRadius}px !important;
  border-bottom-right-radius: ${bottomRadius}px;
`;

const borderRadiusTop = (topRadius = 0) => css`
  border-top-left-radius: ${topRadius}px !important;
  border-top-right-radius: ${topRadius}px !important;
`;

const borderRadius = radius =>
  css`
    border-radius: ${radius + `${typeof radius === `string` ? `;` : `px`}`} !important;
  `;

const borderWithRadius = (width = 1, type = 'solid', color = '#ccc', radius = 0) =>
  css`
    border: ${width}px ${type} ${color} !important;
    ${borderRadius(radius)}
  `;

const boxShadow = (hOffset = 0, vOffset = 0, blur = 0, spread = 0, color = '#ccc') =>
  css`
    box-shadow: ${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color} !important;
  `;

const primaryBackgroundColor = () =>
  css`
    background-color: ${colors.accent};
  `;

const zIndex = (z = 1) => {
  css`
    z-index: ${z};
  `;
};
const textEllipsis = (width = '200px') => css`
  white-space: nowrap;
  overflow: hidden;
  width: ${width};
  text-overflow: ellipsis;
`;
export default {
  height,
  zIndex,
  textEllipsis,
  margin: {
    top,
    bottom,
    right,
    left,
    vertical,
    horizontal
  },
  borderWithRadius,
  borderRadius,
  borderRadiusBottom,
  borderRadiusTop,
  primaryBackgroundColor,
  flexConfig: {
    row,
    column,
    rowCenter,
    unequalColumns
  },
  boxShadow
};
