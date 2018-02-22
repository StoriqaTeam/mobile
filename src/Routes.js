import React from 'react';
import { View } from 'react-native';
import { Router, Modal, Stack, Scene } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import * as auth from './screens/auth';
import * as stores from './screens/stores';
import * as profile from './screens/profile';
import { ROOT, LOGIN, REGISTER, STORES, STORE, PROFILE } from './constants';


export default () => (
  <View style={{ flex: 1 }}>
    <Router wrapBy={observer}>
      <Modal hideNavBar>
        <Stack key={ROOT}>
          <Scene key={STORES} hideNavBar initial component={stores.Stores} />
          <Scene key={STORE} hideNavBar component={stores.StoreDetail} />
          <Scene key={PROFILE} component={profile.ProfileScreen} />
        </Stack>
        <Scene key={LOGIN} component={auth.Login} hideNavBar />
        <Scene key={REGISTER} component={auth.Register} hideNavBar />
      </Modal>
    </Router>
  </View>
);
