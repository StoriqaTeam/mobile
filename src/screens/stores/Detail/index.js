import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default () => (
  <View>
    <Text style={{ fontSize: 25 }}>Store Detail</Text>
    <TouchableOpacity onPress={Actions.list}>
      <Text style={{ color: 'blue' }}>List</Text>
    </TouchableOpacity>
  </View>
);
