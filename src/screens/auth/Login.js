// @flow

import React from 'react';
import { View, Text, TextInput, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { pathOr } from 'ramda';
import relayEnvironment from '../../relay/relayEnvironment';
import styles from './styles';
import Button from '../../components/Buttons';
import MainLayout from '../../layouts/MainLayout';
import { GetJWTByProviderMutation, GetJWTByEmailMutation } from '../../relay/mutations';
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

  handleFacebookAuth = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          console.log('FB result is canceled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            // getting user token from backend server
            const token = pathOr(null, ['accessToken'], data);
            if (token) storeJWTByProvider({ provider: FACEBOOK_PROVIDER, token });
          });
        }
      }, (error) => {
        console.log('FB error: ', error);
      });
  }

  handleFacebookLogout = () => {
    LoginManager.logOut();
  }

  handleGoogleAuth = () => {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      // play services are available. can now configure library
      GoogleSignin.configure({
        iosClientId: '135326128929-equlsuq2cj8jgvffqoqh77bu5a9qerg5.apps.googleusercontent.com', // only for iOS
      }).then(() => {
        // you can now call signIn()
        GoogleSignin.signIn()
          .then((data) => {
            const token = pathOr(null, ['accessToken'], data);
            if (token) storeJWTByProvider({ provider: GOOGLE_PROVIDER, token });
          })
          .catch((err) => {
            console.log('WRONG SIGNIN', err);
          })
          .done();
      });
    }).catch((err) => {
      console.log('Play services error', err.code, err.message);
    });
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
                <Button onPress={this.handleFacebookAuth} title="Sign in with facebook" type="secondary" />
                <Button onPress={this.handleGoogleAuth} title="Sign in with google" />
              </View>
            </View>
            <View style={styles.bottomContent}>
              <Button onPress={Actions.pop} title="Cancel" />
            </View>
          </View>
        </View>
      </MainLayout>
    );
  }
}

function storeJWTByProvider(variables) {
  GetJWTByProviderMutation({
    variables,
    environment: relayEnvironment,
    onCompleted: (response: ?Object) => {
      const userToken = pathOr(null, ['getJWTByProvider', 'token'], response);
      utils.setTokenToStorage(userToken);
      Actions.root();
    },
    onError: (error: Error) => {
      console.log('*** getting user token error: ', error);
    },
  });
}

function storeJWTByEmail(variables) {
  GetJWTByEmailMutation({
    variables,
    environment: relayEnvironment,
    onCompleted: (response: ?Object) => {
      const userToken = pathOr(null, ['getJWTByEmail', 'token'], response);
      utils.setTokenToStorage(userToken);
      Actions.root();
    },
    onError: (error: Error) => {
      console.log('*** getting user token error: ', error);
    },
  });
}


export default Login;
