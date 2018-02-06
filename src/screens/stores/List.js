import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import Button from '../../components/Buttons';
import { StoriqaIcon } from '../../components/Icons';
import MainLayout from '../../layouts/MainLayout';
import { LOGIN_BG_X } from '../../components/Image';


const List = () => (
  <MainLayout
    backgroundURL={LOGIN_BG_X}
  >
    <View style={styles.wrapper}>
      <Button
        title="go to Detail"
        style={[styles.button, { paddingHorizontal: 16 }]}
        onPress={Actions.details}
      />
      <Button
        title="go to Profile"
        style={[styles.button, { paddingHorizontal: 16 }]}
        onPress={Actions.profile}
      />
      <Button
        title="go to Login"
        style={[styles.button, { paddingHorizontal: 16 }]}
        onPress={Actions.login}
      />
      <Button
        title="go to Register"
        style={[styles.button, { paddingHorizontal: 16 }]}
        onPress={Actions.register}
      />
    </View>
  </MainLayout>
);

List.navigationOptions = () => ({
  headerRight: <StoriqaIcon
    name="person"
    size={20}
    color="#505050"
    onPress={Actions.profile}
    style={{ marginRight: 8 }}
  />,
});

export default List;
