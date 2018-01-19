import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


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
      <View>
        <Text style={{ fontSize: 25 }}>Register</Text>
        <TouchableOpacity onPress={() => Actions.login()}>
          <Text style={{ color: 'blue' }}>login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
