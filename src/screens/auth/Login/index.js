// @flow
import React from 'react';
import type { Node } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MainLayout from '../../../layouts/MainLayout';


const LeftButton = (): Node => (
  <TouchableOpacity onPress={Actions.pop}>
    <Text>Back</Text>
  </TouchableOpacity>
);
const RightButton = () => (
  <TouchableOpacity onPress={Actions.register}>
    <Text>Register</Text>
  </TouchableOpacity>
);

export default () => (
  <MainLayout
    navbar={{
      title: <Text>Login title</Text>,
      leftButton: <LeftButton />,
      rightButton: <RightButton />,
    }}
  >
    <View>
      <Text style={{ fontSize: 25 }}>Login</Text>
      <TouchableOpacity onPress={() => Actions.register()}>
        <Text style={{ color: 'blue' }}>register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Actions.app()}>
        <Text style={{ color: 'blue' }}>Home</Text>
      </TouchableOpacity>
    </View>
  </MainLayout>
);
