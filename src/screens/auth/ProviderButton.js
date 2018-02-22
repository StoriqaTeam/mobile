// @flow

import React from 'react';
import type { Node } from 'react';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { pathOr } from 'ramda';
import appStore from '@appStore'; // eslint-disable-line
import Button from '../../components/Buttons';
import { GOOGLE_PROVIDER, FACEBOOK_PROVIDER } from '../../constants';


type PropsType = {
  title: string,
  provider: string,
  type?: 'primary' | 'secondary' | 'default',
  style?: { [key: string]: any },
  leftIcon?: Node,
  rightIcon?: Node,
}

export default ({
  title,
  provider,
  type,
  style,
  leftIcon,
  rightIcon,
}: PropsType) => (
  <Button
    title={title}
    onPress={provider === GOOGLE_PROVIDER ? handleGoogleAuth : handleFacebookAuth}
    type={type}
    style={style}
    leftIcon={leftIcon}
    rightIcon={rightIcon}
  />
);


function handleGoogleAuth() {
  GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
    // play services are available. can now configure library
    GoogleSignin.configure({
      iosClientId: '135326128929-equlsuq2cj8jgvffqoqh77bu5a9qerg5.apps.googleusercontent.com', // only for iOS
    }).then(() => {
      GoogleSignin.signIn()
        .then((data) => {
          const token = pathOr(null, ['accessToken'], data);
          const input = {
            clientMutationId: '',
            provider: GOOGLE_PROVIDER,
            token,
          };
          if (token) appStore.loginByProvider({ input });
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

function handleFacebookAuth() {
  LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
        console.log('FB result is canceled');
      } else {
        AccessToken.getCurrentAccessToken().then((data) => {
          // getting user token from backend server
          const token = pathOr(null, ['accessToken'], data);
          const input = {
            clientMutationId: '',
            provider: FACEBOOK_PROVIDER,
            token,
          };
          if (token) appStore.loginByProvider({ input });
        });
      }
    }, (error) => {
      console.log('FB error: ', error);
    });
}
