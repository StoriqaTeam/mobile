// @flow

import React from 'react';
import { View, Text, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { pathOr } from 'ramda';
import relayEnvironment from '../../relay/relayEnvironment';
import styles from './styles';
import Button from '../../components/Buttons';
import { LOGIN_BG_X } from '../../components/Image';
import { SVGIcon, GOOGLE_SVG, FACEBOOK_SVG } from '../../components/Icons';
import ProviderButton from './ProviderButton';
import MainLayout from '../../layouts/MainLayout';
import { GetJWTByEmailMutation } from '../../relay/mutations';
import { removeTokenFromStorage, setTokenToStorage } from '../../utils';
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
    const input = {
      clientMutationId: '',
      email,
      password,
    };
    storeJWTByEmail({ input });
  }

  handleLogout = () => {
    removeTokenFromStorage();
    Actions.root();
  }

  render() {
    return (
      <MainLayout
        backgroundURL={LOGIN_BG_X}
      >
        <View style={styles.wrapper}>
          <StatusBar hidden />
          <TouchableOpacity
            onPress={Actions.pop}
            style={{ flexDirection: 'row' }}
          >
            {/* <StoriqaIcon name="person" style={{ marginRight: 15 }} /> */}
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

function storeJWTByEmail(variables) {
  GetJWTByEmailMutation({
    variables,
    environment: relayEnvironment,
    onCompleted: (response: ?Object) => {
      const userToken = pathOr(null, ['getJWTByEmail', 'token'], response);
      setTokenToStorage(userToken);
      Actions.reset('root');
    },
    onError: (error: Error) => {
      console.log('*** getting user token error: ', error);
    },
  });
}


export default Login;
