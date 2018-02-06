// @flow

import React from 'react';
import { View, Text, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { pathOr } from 'ramda';
import MainLayout from '../../layouts/MainLayout';
import Button from '../../components/Buttons';
import relayEnvironment from '../../relay/relayEnvironment';
import styles from './styles';
import { CreateUserByEmailMutation } from '../../relay/mutations';
import utils from '../../utils';
import ProviderButton from './ProviderButton';
import { GOOGLE_PROVIDER, FACEBOOK_PROVIDER } from '../../constants';


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
    this.setState({
      email,
    });
  }

  handleChangePass = (password: string) => {
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
    CreateUserByEmailMutation({
      variables,
      environment: relayEnvironment,
      onCompleted: (response: ?Object) => {
        // TODO: логирование
        // console.log('*** Register.handleRegister onCompleted response: ', response);
        const token = pathOr(null, ['getJWTByEmail', 'token'], response);
        // пишем token в локальное хранилище
        if (token) utils.setTokenToStorage(token);
        Actions.root();
      },
      onError: err => console.log('/// onError: ', err), // TODO: логирование
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
                <ProviderButton provider={GOOGLE_PROVIDER} title="Sign up with google" />
                <ProviderButton provider={FACEBOOK_PROVIDER} title="Sign up with facebook" />
                <TouchableOpacity onPress={Actions.login}>
                  <Text>Already have an account? Login</Text>
                </TouchableOpacity>
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
