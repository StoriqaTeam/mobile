// @flow
import React from 'react';
// import type { Node } from 'react';
import { View, Text, TextInput, StatusBar, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { graphql, commitMutation } from 'react-relay';
import styles from './styles';
import relayEnvironment from '../../relay/relayEnvironment';
// import StoriqaIcon from '../../components/Icons';
import Button from '../../components/Buttons';
import MainLayout from '../../layouts/MainLayout';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';


// const LoginQuery = graphql`
//   query Login_version_Query {
//     viewer {
//       currentUser {
//         id
//         email
//       }
//     }
//   }
// `;

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
            console.log('*** Login.handleLogin onCompleted response: ', response);
            const { getJWTByEmail: { token } } = response;
            // пишем token в локальное хранилище
            try {
              AsyncStorage.setItem('@Storiqa:token', token);
              Actions.root();
            } catch (err) {
              // TODO: логирование
              console.log('*** Login.handleLogin AsyncStorage error while set token: ', err);
            }
          }
        },
        onError: err => console.log('/// onError: ', err), // TODO: логирование
      },
    );
  }

  handleFacebookAuth = () => {
    LoginManager.logInWithReadPermissions(['public_profile'])
      .then((result) => {
        if (result.isCancelled) {
          console.log('FB result is canceled');
        } else {
          console.log('Login Success permission granted: ', result.grantedPermissions);
          AccessToken.getCurrentAccessToken().then((data) => {
            if (data) {
              const { accessToken } = data;
              console.log('FB access token: ', accessToken);
            }
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
      console.log('Play services exist');
      GoogleSignin.configure({
        iosClientId: '135326128929-equlsuq2cj8jgvffqoqh77bu5a9qerg5.apps.googleusercontent.com', // only for iOS
        // webClientId: '135326128929-8pfv06doro1n447uc05giv8su8csgurv.apps.googleusercontent.com',
        // project_id: 'storiqa-193711',
        // auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        // token_uri: 'https://accounts.google.com/o/oauth2/token',
        // auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      }).then(() => {
        // you can now call currentUserAsync()
        console.log('handleGoogleAuth configured');
        GoogleSignin.signIn()
          .then((user) => {
            console.log('google dign in user: ', user);
            // user.accessToken - use this
            // this.setState({user: user});
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

// Login.navigationOptions = () => ({
//   headerLeft: <HeaderButton title="cancel" onPress={Actions.pop} />,
// });

export default Login;
