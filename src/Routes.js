import 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import * as auth from './screens/auth';
import * as stores from './screens/stores';


const AuthNavigator = StackNavigator({
  Login: {
    screen: auth.LoginScreen,
  },
  Register: {
    screen: auth.RegisterScreen,
  },
});


const StoreNavigator = StackNavigator({
  List: {
    screen: stores.ListScreen,
  },
  Detail: {
    screen: stores.DetailScreen,
  },
});


export default TabNavigator({
  AuthTab: {
    screen: AuthNavigator,
  },
  AppTab: {
    screen: StoreNavigator,
  },
});
