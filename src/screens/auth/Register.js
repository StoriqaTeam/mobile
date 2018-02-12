// @flow

import React from 'react';
import { View, Text, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { pathOr } from 'ramda';
import MainLayout from '../../layouts/MainLayout';
import Button from '../../components/Buttons';
import relayEnvironment from '../../relay/relayEnvironment';
import styles from './styles';
import { REGISTER_BG_X } from '../../components/Image';
import { SVGIcon, GOOGLE_SVG, FACEBOOK_SVG } from '../../components/Icons';
import { CreateUserByEmailMutation } from '../../relay/mutations';
import { setTokenToStorage } from '../../utils';
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
        if (token) setTokenToStorage(token);
        Actions.root();
      },
      onError: err => console.log('/// onError: ', err), // TODO: логирование
    });
  }

  render() {
    return (
      <MainLayout
        backgroundURL={REGISTER_BG_X}
      >
        <View style={styles.wrapper}>
          <StatusBar hidden />
          <TouchableOpacity
            onPress={Actions.pop}
            style={{ flexDirection: 'row' }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
          <View style={styles.headerWrapper}>
            <Text style={styles.title}> Sign Up</Text>
            <Text style={styles.subTitle}>Sign up with your email or provider.</Text>
          </View>
          <View style={styles.formWrapper}>
            <View style={styles.providersWrapper}>
              <ProviderButton
                provider={GOOGLE_PROVIDER}
                title="with google"
                leftIcon={<SVGIcon name={GOOGLE_SVG} />}
                style={{ paddingHorizontal: 16, backgroundColor: 'transparent' }}
              />
              <ProviderButton
                provider={FACEBOOK_PROVIDER}
                title="with facebook"
                leftIcon={<SVGIcon name={FACEBOOK_SVG} />}
                style={{ paddingHorizontal: 16, backgroundColor: 'transparent' }}
              />
            </View>
            <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#333', fontSize: 20 }}>OR</Text>
            </View>
            <View style={styles.formFields}>
              <TextInput
                onChangeText={this.handleChangeEmail}
                placeholder="Email"
                style={styles.textInput}
              />
              <View style={styles.separator} />
              <TextInput
                onChangeText={this.handleChangePass}
                secureTextEntry
                placeholder="Password"
                style={styles.textInput}
              />
            </View>
          </View>
          <View style={styles.footerWrapper}>
            <Button onPress={this.handleRegister} title="Sign Up with email" style={styles.signinButton} />
            <TouchableOpacity onPress={Actions.login} style={styles.centerTextWrapper}>
              <Text>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </MainLayout>
    );
  }
}
