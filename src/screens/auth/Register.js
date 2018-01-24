import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MainLayout from '../../layouts/MainLayout';


export default class Register extends React.Component {
  static navigationOptions = () => (
    {
      headerRight: (
        <TouchableOpacity>
          <Text>Right button</Text>
        </TouchableOpacity>
      ),
    }
  )
  render() {
    return (
      <MainLayout>
        <View>
          <StatusBar hidden />
          <Text style={{ fontSize: 25 }}>Register</Text>
          <TouchableOpacity onPress={() => Actions.login()}>
            <Text style={{ color: 'blue' }}>login</Text>
          </TouchableOpacity>
        </View>
      </MainLayout>
    );
  }
}
