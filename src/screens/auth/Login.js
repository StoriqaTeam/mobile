// @flow
import React from 'react';
import type { Node } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { graphql, QueryRenderer } from 'react-relay';
import styles from './Login.styles';
import relayEnvironment from '../../relay/relayEnvironment';
import StoriqaIcon from '../../components/Icons';
import Button from '../../components/Buttons';
import MainLayout from '../../layouts/MainLayout';


const LeftButton = (): Node => (
  <TouchableOpacity onPress={Actions.pop}>
    <Text>Back</Text>
  </TouchableOpacity>
);
const RightButton = () => [
  <TouchableOpacity key="person" onPress={Actions.register}>
    <StoriqaIcon name="person" size={20} color="#505050" />
  </TouchableOpacity>,
  <TouchableOpacity key="cart" onPress={Actions.pop}>
    <StoriqaIcon name="cart" size={20} color="#505050" />
  </TouchableOpacity>,
];

const LoginQuery = graphql`
  query Login_version_Query {
    apiVersion
  }
`;

const Login = () => (
  <QueryRenderer
    environment={relayEnvironment}
    query={LoginQuery}
    render={({ error, props }) => {
      if (error) return <Text>Login screen error: {error}</Text>;
      return (
        <MainLayout>
          <View style={styles.wrapper}>
            <Text style={{ fontSize: 25 }}>Login (apiVersion: {props && props.apiVersion})</Text>
            <Button onPress={Actions.register} text="Register" primary />
            <Button onPress={Actions.app} text="Home" />
          </View>
        </MainLayout>
      );
    }}
  />
);

Login.navigationOptions = () => ({
  title: 'Hello Login Screen',
  headerBackTitle: 'Back title',
});

export default Login;
