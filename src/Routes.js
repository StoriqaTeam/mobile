import React from 'react';
import {
  Router,
  Stack,
  Scene,
} from 'react-native-router-flux';
import App from './App';
import * as auth from './screens/auth';
import * as stores from './screens/stores';


export default () => (
  <Router>
    <Stack key="root" hideNavBar>
      <Scene key="login" component={auth.LoginScreen} title="Login" />
      <Scene key="register" component={auth.RegisterScreen} title="Register" />
      <Stack key="app">
        <Scene key="list" component={stores.ListScreen} title="List Screen" />
        <Scene key="details" component={stores.DetailScreen} title="Details screen" />
        <Scene key="home" component={App} title="" />
      </Stack>
    </Stack>
  </Router>
);
