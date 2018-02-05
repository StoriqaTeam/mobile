// @flow

import React from 'react';
import { View, Text, TextInput, StatusBar } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { pathOr } from 'ramda';
import relayEnvironment from '../../relay/relayEnvironment';
import styles from './styles';
import Button, { HeaderButton } from '../../components/Buttons';
import ProviderButton from './ProviderButton';
import MainLayout from '../../layouts/MainLayout';
import { GetJWTByEmailMutation } from '../../relay/mutations';
import utils from '../../utils';
import { GOOGLE_PROVIDER, FACEBOOK_PROVIDER } from '../../constants';


type StateType = {
  email: string,
  password: string,
}

class Login extends React.Component<{}, StateType> {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChangeEmail = (email: string) => {
    this.setState({
      email,
    });
  }

  handleChangePass = (password: string) => {
    this.setState({
      password,
    });
  }

  handleEmailAuth = () => {
    const { email, password } = this.state;
    storeJWTByEmail({ email, password });
  }

  handleLogout = () => {
    utils.removeTokenFromStorage();
    Actions.root();
  }

  render() {
    return (
      <MainLayout
        style={{
          backgroundColor: '#fff',
        }}
      >
        <View style={styles.wrapper}>
          <StatusBar hidden />
          <View style={styles.contentWrapper}>
            <View style={styles.content}>
              <Text style={{ fontSize: 25 }}>Login</Text>
              <View style={styles.formContainer}>
                <TextInput
                  onChangeText={this.handleChangeEmail}
                  placeholder="email"
                  style={styles.textInput}
                />
                <TextInput
                  onChangeText={this.handleChangePass}
                  secureTextEntry
                  placeholder="password"
                  style={styles.textInput}
                />
                <Button onPress={this.handleEmailAuth} title="Sign in with email" />
                <ProviderButton provider={GOOGLE_PROVIDER} title="Sign in with google" />
                <ProviderButton provider={FACEBOOK_PROVIDER} title="Sign in with facebook" />
              </View>
            </View>
            <View style={styles.bottomContent}>
              <Button onPress={this.handleLogout} title="Logout" />
              <Button onPress={Actions.pop} title="Cancel" />
            </View>
          </View>
        </View>
      </MainLayout>
    );
  }
}

function storeJWTByEmail(variables) {
  GetJWTByEmailMutation({
    variables,
    environment: relayEnvironment,
    onCompleted: (response: ?Object) => {
      const userToken = pathOr(null, ['getJWTByEmail', 'token'], response);
      utils.setTokenToStorage(userToken);
      Actions.reset('root');
    },
    onError: (error: Error) => {
      console.log('*** getting user token error: ', error);
    },
  });
}


export default Login;
