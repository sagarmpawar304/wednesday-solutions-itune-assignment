/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import map from 'lodash/map';
import { compose } from 'redux';
import { Layout, Switch as Toggler } from 'antd';
import { routeConfig } from '@app/routeConfig';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '@app/global-styles';
import { colors } from '@themes';
import Header from '@components/Header';
import For from '@components/For';
import { styles } from '@app/themes/index';

const IntialTheme = colors.theme.lightMode;

const TogglerWrapper = styled.div`
  ${styles.margin.top(1.5)};
  display: flex;
  flex-direction: row-reverse;
  button {
    margin-right: 2rem !important;
    background-color: ${props => props.theme.primary};
  }
`;

const Content = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  width: 90vw !important;
  margin: 0 auto !important;
`;

export function App({ location }) {
  const [theme, setTheme] = useState(IntialTheme);

  const changeTheme = e => {
    if (e) {
      setTheme(colors.theme.darkMode);
    } else {
      setTheme(IntialTheme);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <TogglerWrapper>
        <Toggler onClick={e => changeTheme(e)} />
      </TogglerWrapper>
      <Content>
        <For
          ParentComponent={props => <Switch {...props} />}
          of={map(Object.keys(routeConfig))}
          renderItem={(routeKey, index) => {
            const Component = routeConfig[routeKey].component;
            return (
              <Route
                exact={routeConfig[routeKey].exact}
                key={index}
                path={routeConfig[routeKey].route}
                render={props => {
                  const updatedProps = {
                    ...props,
                    ...routeConfig[routeKey].props
                  };
                  return <Component {...updatedProps} />;
                }}
              />
            );
          }}
        />
      </Content>
      <GlobalStyle />
    </ThemeProvider>
  );
}
App.propTypes = {
  location: PropTypes.object
};
export default compose(withRouter)(App);
