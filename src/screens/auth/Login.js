// @flow
import React from 'react';
import type { Node } from 'react';
import { View, Text, TextInput, StatusBar, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { graphql, commitMutation, QueryRenderer } from 'react-relay';
import styles from './styles';
import relayEnvironment from '../../relay/relayEnvironment';
// import StoriqaIcon from '../../components/Icons';
import Button from '../../components/Buttons';
import MainLayout from '../../layouts/MainLayout';


const LoginQuery = graphql`
  query Login_version_Query {
    viewer {
      currentUser {
        id
        email
      }
    }
  }
`;

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
                <Button onPress={this.handleLogin} title="Sign in" />
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
