import React from 'react';
import { View, AsyncStorage, StatusBar } from 'react-native';
import { Router, Modal, Tabs, Stack, Scene, Actions } from 'react-native-router-flux';
import App from './App';
import * as auth from './screens/auth';
import * as stores from './screens/stores';


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
          <Scene key="list" initial component={stores.ListScreen} title="List Screen" />
          <Scene key="details" component={stores.DetailScreen} title="Details screen" />
        </Stack>
        <Stack key="payment">
          <Scene key="home" on={handleCheckAuth} component={App} title="" />
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
