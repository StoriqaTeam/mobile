import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Router, Modal, Tabs, Stack, Scene, Actions } from 'react-native-router-flux';
import * as auth from './screens/auth';
import * as stores from './screens/stores';
import * as profile from './screens/profile';
// import ProfileScreen from './screens/profile/Profile';


function handleCheckAuth() {
  console.log('*** Routes check token: ');
  AsyncStorage.getItem('@Storiqa:token').then((token) => {
    console.log('*** Routes check token: ', token);
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
          <Scene key="list" initial component={stores.ListScreen} title="List Screen" />
          <Scene key="details" component={stores.DetailScreen} title="Details screen" />
          <Scene key="profile" on={handleCheckAuth} component={profile.ProfileScreen} title="Profile screen" />
        </Stack>
        <Tabs
          swipeEnabled
          animationEnabled
          hideNavBar
          tabBarPosition="top"
          tabStyle={{ backgroundColor: '#fff' }}
          labelStyle={{ color: '#000' }}
          tabBarStyle={{ backgroundColor: '#fff' }}
          activeTintColor="#2fbafd"
        >
          <Scene key="login" component={auth.Login} title="Login" hideNavBar />
          <Scene key="register" component={auth.Register} title="Register" hideNavBar />
        </Tabs>
      </Modal>
    </Router>
  </View>
);
