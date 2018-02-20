import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Router, Modal, Stack, Scene, Actions } from 'react-native-router-flux';
import * as auth from './screens/auth';
import * as stores from './screens/stores';
import * as profile from './screens/profile';


function handleCheckAuth() {
  AsyncStorage.getItem('@Storiqa:token').then((token) => {
    if (!token) {
      Actions.login();
    }
  });
}


export default () => (
  <View style={{ flex: 1 }}>
    <Router>
      <Modal hideNavBar>
        <Stack key="root">
          <Scene key="stores" initial on={handleCheckAuth} component={stores.StoresScreen} title="Stores Screen" hideNavBar />
          <Scene key="store" component={stores.StoreDetailScreen} title="Store detail screen" hideNavBar />
          <Scene key="profile" on={handleCheckAuth} component={profile.ProfileScreen} title="Profile screen" />
        </Stack>
        <Scene key="login" component={auth.Login} title="Login" hideNavBar />
        <Scene key="register" component={auth.Register} title="Register" hideNavBar />
      </Modal>
    </Router>
  </View>
);
