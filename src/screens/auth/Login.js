// @flow

import React from 'react';
import { View, Text, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import appStore from '@appStore'; // eslint-disable-line
import styles from './styles';
import Button from '../../components/Buttons';
import { LOGIN_BG_X } from '../../components/Image';
import { SVGIcon, GOOGLE_SVG, FACEBOOK_SVG } from '../../components/Icons';
import ProviderButton from './ProviderButton';
import MainLayout from '../../layouts/MainLayout';
import { GOOGLE_PROVIDER, FACEBOOK_PROVIDER } from '../../constants';


type StateType = {
  email: string,
  password: string,
}

export default class Login extends React.Component<{}, StateType> {
  constructor(props) {
    super(props);
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
    const variables = {
      input: {
        clientMutationId: '',
        email,
        password,
      },
    };
    appStore.loginByEmail(variables);
  }

  render() {
    return (
      <MainLayout
        backgroundURL={LOGIN_BG_X}
      >
        <View style={styles.wrapper}>
          <StatusBar hidden />
          <TouchableOpacity
            onPress={() => Actions.reset('root')}
            style={{ flexDirection: 'row' }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
          <View style={styles.headerWrapper}>
            <Text style={styles.title}> Sign In</Text>
            <Text style={styles.subTitle}>Sign in with your email or provider.</Text>
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
            <Button onPress={this.handleEmailAuth} title="Sign in with email" style={styles.signinButton} />
            <TouchableOpacity onPress={Actions.register} style={styles.centerTextWrapper}>
              <Text>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </MainLayout>
    );
  }
}
