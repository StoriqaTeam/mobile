import { observable, autorun, action, computed } from 'mobx';
import { Actions } from 'react-native-router-flux';
import { getTokenFromStorage, setTokenToStorage, removeTokenFromStorage } from '../utils';

class AppState {
  @observable token;
  @observable navigationState;

  constructor() {
    this.requestToken();
    this.navigationState = this.observeActionsState;
    autorun(() => {
      console.log('--- appState autorun token: ', this.token);
      this.handelRouting(Actions.currentScene);
    });
    autorun(() => {
      console.log('--- appState autorun navigationState: ', this.navigationState);
    });
  }

  @action handelRouting = (scene) => {
    // TODO: реализовать chain of responsability для обработки текущего роутинга
    console.log('--- appState handelRouting scene: ', scene);
    if (scene === 'profile' && !this.token) Actions.login();
  }

  @action setNavigationState(state) {
    this.navigationState = state;
  }

  @action requestToken() {
    getTokenFromStorage().then((result) => {
      if (result) this.token = result;
    });
  }

  @action setToken(value) {
    this.token = value;
    setTokenToStorage(value);
  }

  @action removeToken() {
    this.token = undefined;
    removeTokenFromStorage();
  }

  @action logout() {
    this.removeToken();
    Actions.reset('root');
    console.log('--- appState Actions.currentScene: ', Actions.currentScene);
  }
}

export default new AppState();
