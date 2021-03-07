import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import propTypes from 'prop-types';
import media from '@app/themes/media';
import { fonts, styles } from '@app/themes/index';

const { Search } = Input;

const SearchComponent = ({ onChange, placeholder, onSearch }) => {
  return (
    <SearchWrapper>
      <Search data-testid="search-bar" placeholder={placeholder} onChange={onChange} onSearch={onSearch} enterButton />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  padding: 2.2rem;
  background-color: ${props => props.theme.primary};
  input {
    ${fonts.size.regular()};
  }

  ${styles.borderRadius(10)}

  button {
    display: flex;
    align-items: center;
    margin: 0;
  }
  ${media.mobile.max(`
    padding:1.5rem;
  `)}
`;

SearchComponent.propTypes = {
  onChange: propTypes.func.isRequired,
  onSearch: propTypes.func.isRequired,
  placeholder: propTypes.string
};

SearchComponent.defaultProps = {
  placeholder: 'Enter a search value'
};

export default SearchComponent;
