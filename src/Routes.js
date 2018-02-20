import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Router, Modal, Stack, Scene, Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import * as auth from './screens/auth';
import * as stores from './screens/stores';
import * as profile from './screens/profile';
import appState from './appState';


function handleCheckAuth() {
  // AsyncStorage.getItem('@Storiqa:token').then((token) => {
  //   if (!token) {
  //     Actions.login();
  //   }
  // });
  // console.log('*** handleCheckAuth token: ', appState.token);
  // if (!appState.token) Actions.login();
}


export default () => (
  <View style={{ flex: 1 }}>
    <Router wrapBy={observer}>
      <Modal hideNavBar>
        <Stack key="root">
          <Scene key="stores" hideNavBar initial component={stores.StoresScreen} on={handleCheckAuth} />
          <Scene key="store" hideNavBar component={stores.StoreDetailScreen} on={handleCheckAuth} />
          <Scene key="profile" component={profile.ProfileScreen} on={handleCheckAuth} />
        </Stack>
        <Scene key="login" component={auth.Login} title="Login" hideNavBar />
        <Scene key="register" component={auth.Register} title="Register" hideNavBar />
      </Modal>
    </Router>
  </View>
);
