// @flow
import { observable, autorun, action } from 'mobx'; // eslint-disable-line
import { Actions } from 'react-native-router-flux'; // eslint-disable-line
import R from 'ramda'; // eslint-disable-line
import {
  UpdateUserMutation,
  GetJWTByProviderMutation,
  GetJWTByEmailMutation,
  CreateUserByEmailMutation,
} from '../relay/mutations';
import relayEnvironment from '../relay/relayEnvironment';
import { getTokenFromStorage, setTokenToStorage, removeTokenFromStorage } from '../utils';
import { ROOT, PROFILE } from '../constants';


class AppStore {
  @observable token;

  constructor() {
    this.requestToken();
    autorun(() => {
      this.handelRouting(Actions.currentScene);
    });
  }

  @action handelRouting = (scene: string) => {
    // TODO: реализовать chain of responsability для обработки текущего роутинга
    if (scene === PROFILE && !this.token) Actions.login();
  }

  @action requestToken = () => {
    getTokenFromStorage().then((result) => {
      if (result) this.token = result;
    });
  }

  @action setToken = (value: string) => {
    this.token = value;
    setTokenToStorage(value);
  }

  @action removeToken = () => {
    this.token = undefined;
    removeTokenFromStorage();
  }

  @action logout = () => {
    this.removeToken();
    Actions.reset(ROOT);
  }

  updateUser = (variables) => {
    UpdateUserMutation({
      variables,
      environment: relayEnvironment,
    });
  }

  loginByProvider = (variables) => {
    GetJWTByProviderMutation({
      variables,
      environment: relayEnvironment,
      onCompleted: (response: ?Object) => {
        const token = R.pathOr(null, ['getJWTByProvider', 'token'], response);
        if (token) this.setToken(token);
        Actions.reset(ROOT);
      },
      onError: (error: Error) => {
        console.log('*** getting user token error: ', error);
      },
    });
  }

  // принимает объект с полем атрибутом: CreateJWTEmailInput!
  loginByEmail = (variables) => {
    GetJWTByEmailMutation({
      variables,
      environment: relayEnvironment,
      onCompleted: (response: ?Object) => {
        const token = R.pathOr(null, ['getJWTByEmail', 'token'], response);
        if (token) this.setToken(token);
        Actions.reset(ROOT);
      },
      onError: (error: Error) => {
        console.log('*** getting user token error: ', error);
      },
    });
  }

  registerByEmail = (variables) => {
    CreateUserByEmailMutation({
      variables,
      environment: relayEnvironment,
      onCompleted: (response: ?Object) => {
        // TODO: логирование
        const token = R.pathOr(null, ['getJWTByEmail', 'token'], response);
        // пишем token в локальное хранилище
        if (token) this.setToken(token);
        Actions.reset(ROOT);
      },
      onError: err => console.log('/// onError: ', err), // TODO: логирование
    });
  }
}

export default new AppStore();
