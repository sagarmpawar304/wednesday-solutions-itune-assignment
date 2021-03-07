/**
 *
 * Stories for Card
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Card from '../index';

storiesOf('Card').add('song card', () => <Card id={text('card', 'display a card')} />);
