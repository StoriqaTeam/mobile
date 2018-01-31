// @flow

import React from 'react';
import { View, Text, TextInput, StatusBar, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { graphql, commitMutation } from 'react-relay';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { pathOr } from 'ramda';
import styles from './styles';
import relayEnvironment from '../../relay/relayEnvironment';
import Button from '../../components/Buttons';
import MainLayout from '../../layouts/MainLayout';
import { GetJWTByProviderMutation } from '../../relay/mutations';
import utils from '../../utils';

const GOOGLE_PROVIDER = 'GOOGLE';
const FACEBOOK_PROVIDER = 'FACEBOOK';


function storeJWTByProvider(provider, token) {
  const mutationParams = {
    provider,
    token,
    environment: relayEnvironment,
    onCompleted: (response: ?Object) => {
      const userToken = pathOr(null, ['getJWTByProvider', 'token'], response);
      console.log('*** getting user token utils: ', utils);
      utils.setTokenToStorage(userToken);
      Actions.root();
    },
    onError: (error: Error) => {
      console.log('*** getting user token error: ', error);
    },
  };
  // console.log('FB mutation params: ', mutationParams);
  GetJWTByProviderMutation(mutationParams);
}


const mutation = graphql`
  mutation Login_version_Mutation($email: String!, $password: String!) {
    getJWTByEmail(email: $email, password: $password) {
      token
    }
  }
`;

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
    console.log('** email: ', email);
    this.setState({
      email,
    });
  }

  handleChangePass = (password: string) => {
    console.log('** pass: ', password);
    this.setState({
      password,
    });
  }

  handleLogin = () => {
    const { email, password } = this.state;
    const variables = {
      email,
      password,
    };
    commitMutation(
      relayEnvironment,
      {
        mutation,
        variables,
        onCompleted: (response, errors) => {
          if (!errors) {
            // TODO: логирование
            // пишем token в локальное хранилище
            const token = pathOr(null, ['getJWTByProvider', 'token'], response);
            AsyncStorage.setItem('@Storiqa:token', token);
            Actions.root();
          }
        },
        onError: err => console.log('/// onError: ', err), // TODO: логирование
      },
    );
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
            if (token) storeJWTByProvider(FACEBOOK_PROVIDER, token);
          });
        }
      }, (error) => {
        console.log('FB error: ', error);
      });
  }

  handleLogout = () => {
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
            if (token) storeJWTByProvider(GOOGLE_PROVIDER, token);
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
    AsyncStorage.getItem('@Storiqa:token', (err, result) => {
      console.log('*** result: ', result);
    });
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
                <Button onPress={this.handleFacebookAuth} title="Sign in with facebook" />
                {/* <Button onPress={this.handleLogout} title="Logout with facebook" type="secondary" /> */}
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


export default Login;
