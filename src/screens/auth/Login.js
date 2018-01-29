// @flow
import React from 'react';
// import type { Node } from 'react';
import { View, Text, TextInput, StatusBar, AsyncStorage, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { graphql, commitMutation } from 'react-relay';
import styles from './styles';
import relayEnvironment from '../../relay/relayEnvironment';
// import StoriqaIcon from '../../components/Icons';
import Button from '../../components/Buttons';
import MainLayout from '../../layouts/MainLayout';
import { LoginManager, AccessToken } from 'react-native-fbsdk';


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

  handleLoginManager = () => {
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
                <Button onPress={this.handleLoginManager} title="Sign in with facebook" primary />
                <Button onPress={this.handleLogout} title="Logout with facebook" secondary />
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