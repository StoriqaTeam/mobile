// @flow

import React from 'react';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { pathOr } from 'ramda';
import { Actions } from 'react-native-router-flux';
import Button from '../../components/Buttons';
import { GetJWTByProviderMutation } from '../../relay/mutations';
import relayEnvironment from '../../relay/relayEnvironment';
import utils from '../../utils';
import { GOOGLE_PROVIDER, FACEBOOK_PROVIDER } from '../../constants';


type PropsType = {
  title: string,
  provider: string,
  type?: 'primary' | 'secondary' | 'default',
  style?: { [key: string]: any },
}

export default ({
  title,
  provider,
  type,
  style,
}: PropsType) => (
  <Button
    title={title}
    onPress={provider === GOOGLE_PROVIDER ? handleGoogleAuth : handleFacebookAuth}
    type={type}
    style={style}
  />
);


function storeJWTByProvider(variables) {
  GetJWTByProviderMutation({
    variables,
    environment: relayEnvironment,
    onCompleted: (response: ?Object) => {
      const userToken = pathOr(null, ['getJWTByProvider', 'token'], response);
      console.log('*** getting user token: ', userToken);
      utils.setTokenToStorage(userToken);
      Actions.root();
    },
    onError: (error: Error) => {
      console.log('*** getting user token error: ', error);
    },
  });
}

function handleGoogleAuth() {
  GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
    // play services are available. can now configure library
    GoogleSignin.configure({
      iosClientId: '135326128929-equlsuq2cj8jgvffqoqh77bu5a9qerg5.apps.googleusercontent.com', // only for iOS
    }).then(() => {
      // you can now call signIn()
      GoogleSignin.signIn()
        .then((data) => {
          const token = pathOr(null, ['accessToken'], data);
          if (token) storeJWTByProvider({ provider: GOOGLE_PROVIDER, token });
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
          if (token) storeJWTByProvider({ provider: FACEBOOK_PROVIDER, token });
        });
      }
    }, (error) => {
      console.log('FB error: ', error);
    });
}
