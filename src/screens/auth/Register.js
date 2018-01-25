import React from 'react';
import { AsyncStorage, View, Text, TextInput, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { graphql, commitMutation } from 'react-relay';
import MainLayout from '../../layouts/MainLayout';
import Button from '../../components/Buttons';
import relayEnvironment from '../../relay/relayEnvironment';
import styles from './styles';


const mutation = graphql`
  mutation Register_version_Mutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
    }
    getJWTByEmail(email: $email, password: $password) {
      token
    }
  }
`;

type StateType = {
  email: string,
  password: string,
}

export default class Register extends React.Component<{}, StateType> {
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

  handleRegister = () => {
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
            // console.log('*** Register.handleRegister onCompleted response: ', response);
            const { getJWTByEmail: { token } } = response;
            // пишем token в локальное хранилище
            try {
              AsyncStorage.setItem('@Storiqa:token', token);
              Actions.pop();
              Actions.pop();
            } catch (err) {
              // TODO: логирование
              console.log('*** Register.handleRegister AsyncStorage error while set token: ', err);
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
              <Text style={{ fontSize: 25 }}>Register</Text>
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
                <Button onPress={this.handleRegister} title="Sign up" />
              </View>
            </View>
            <View style={styles.bottomContent}>
              <Button onPress={() => { Actions.pop(); Actions.pop(); }} title="Cancel" />
            </View>
          </View>
        </View>
      </MainLayout>
    );
  }
}
