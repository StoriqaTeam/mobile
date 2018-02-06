// @flow

import React from 'react';
import { Image, View, Text, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { pathOr } from 'ramda';
import SvgUri from 'react-native-svg-uri';
import relayEnvironment from '../../relay/relayEnvironment';
import styles from './styles';
import Button from '../../components/Buttons';
import { LOGIN_BG, LOGIN_BG_X } from '../../components/Image';
import { StoriqaIcon, GOOGLE_SVG } from '../../components/Icons';
import ProviderButton from './ProviderButton';
import MainLayout from '../../layouts/MainLayout';
import { GetJWTByEmailMutation } from '../../relay/mutations';
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

  handleLogout = () => {
    utils.removeTokenFromStorage();
    Actions.root();
  }

  render() {
    return (
      <MainLayout
        style={{
          // backgroundColor: '#fff',
          // backgroundImage: 'url(../../img/login_bg.png)',
        }}
        backgroundURL={LOGIN_BG_X}
      >
        <View style={styles.wrapper}>
          <StatusBar hidden />
          <TouchableOpacity
            onPress={Actions.pop}
            style={{ flexDirection: 'row' }}
          >
            <SvgUri
              width="200"
              height="200"
              source={require('../../svg/google-icon.svg')}
            />
            {/* <StoriqaIcon name="person" style={{ marginRight: 15 }} /> */}
            <Text>Cancel</Text>
          </TouchableOpacity>
          <View style={styles.headerWrapper}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subTitle}>Sign in with your email or provider.</Text>
          </View>
          <View style={styles.formWrapper}>
            <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
              {/* <SVGIcon name={GOOGLE_SVG} /> */}
              <ProviderButton
                provider={GOOGLE_PROVIDER}
                title="Sign in with google"
                style={{ paddingHorizontal: 16 }}
              />
              <ProviderButton
                provider={FACEBOOK_PROVIDER}
                title="Sign in with facebook"
                style={{ paddingHorizontal: 16 }}
              />
            </View>
            <View style={styles.formFields}>
              <TextInput
                onChangeText={this.handleChangeEmail}
                placeholder="Email"
                style={styles.textInput}
              />
              <View style={{ width: '100%', height: 1, backgroundColor: '#333', opacity: 0.1 }} />
              <TextInput
                onChangeText={this.handleChangePass}
                secureTextEntry
                placeholder="Password"
                style={styles.textInput}
              />
            </View>
            <Button onPress={this.handleEmailAuth} title="Sign in with email" />
            <TouchableOpacity onPress={Actions.register}>
              <Text>Have not an account? Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerWrapper}>
            <Button onPress={this.handleLogout} title="Logout" />
            <Button onPress={Actions.pop} title="Cancel" />
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
      utils.setTokenToStorage(userToken);
      Actions.reset('root');
    },
    onError: (error: Error) => {
      console.log('*** getting user token error: ', error);
    },
  });
}


export default Login;
