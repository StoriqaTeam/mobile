import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default () => (
  <View>
    <Text style={{ fontSize: 25 }}>Stores List</Text>
    <TouchableOpacity onPress={Actions.details}>
      <Text style={{ color: 'blue' }}>Detail</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={Actions.profile}>
      <Text style={{ color: 'blue' }}>Profile</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={Actions.login}>
      <Text style={{ color: 'blue' }}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={Actions.register}>
      <Text style={{ color: 'blue' }}>Register</Text>
    </TouchableOpacity>
  </View>
);
