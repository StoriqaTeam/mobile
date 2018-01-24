import React from 'react';
import { AsyncStorage } from 'react-native';
import * as RNRF from 'react-native-router-flux';
import App from './App';
import * as auth from './screens/auth';
import * as stores from './screens/stores';


function handleCheckAuth() {
  AsyncStorage.getItem('@Storiqa:token').then((token) => {
    if (!token) {
      RNRF.Actions.login();
    }
  });
}


export default () => (
  <RNRF.Router>
    <RNRF.Stack key="root" hideNavBar>
      <RNRF.Stack key="app">
        <RNRF.Scene key="list" on={handleCheckAuth} component={stores.ListScreen} title="List Screen" />
        <RNRF.Scene key="details" on={handleCheckAuth} component={stores.DetailScreen} title="Details screen" />
        <RNRF.Scene key="home" on={handleCheckAuth} component={App} title="" />
      </RNRF.Stack>
      <RNRF.Stack key="auth" modal>
        <RNRF.Scene key="login" component={auth.Login} title="Login" />
        <RNRF.Scene key="register" component={auth.Register} title="Register" />
      </RNRF.Stack>
    </RNRF.Stack>
  </RNRF.Router>
);
