import React from 'react';
import * as RNRF from 'react-native-router-flux';
import App from './App';
import * as auth from './screens/auth';
import * as stores from './screens/stores';


export default () => (
  <RNRF.Router>
    <RNRF.Stack key="root" hideNavBar>
      <RNRF.Scene key="login" component={auth.LoginScreen} title="Login" />
      <RNRF.Scene key="register" component={auth.RegisterScreen} title="Register" />
      <RNRF.Stack key="app">
        <RNRF.Scene key="list" component={stores.ListScreen} title="List Screen" />
        <RNRF.Scene key="details" component={stores.DetailScreen} title="Details screen" />
        <RNRF.Scene key="home" component={App} title="" />
      </RNRF.Stack>
    </RNRF.Stack>
  </RNRF.Router>
);
