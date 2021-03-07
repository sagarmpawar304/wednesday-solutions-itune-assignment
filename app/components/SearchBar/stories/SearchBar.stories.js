import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import SearchBar from '../index';

storiesOf('SearchBar').add('simple', () => <SearchBar id={text('id', 'searchBar')} />);
