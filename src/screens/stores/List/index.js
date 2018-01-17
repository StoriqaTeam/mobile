import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { NavigationState } from 'react-navigation/src/TypeDefinition';


type ScreenType = {
  navigation: NavigationState,
}

export default ({ navigation: { navigate } }: ScreenType) => (
  <View>
    <Text style={{ fontSize: 25 }}>Stores List</Text>
    <TouchableOpacity onPress={() => navigate('Detail')}>
      <Text style={{ color: 'blue' }}>Detail</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigate('AuthTab')}>
      <Text style={{ color: 'blue' }}>AuthTab</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigate('Login')}>
      <Text style={{ color: 'blue' }}>Login</Text>
    </TouchableOpacity>
  </View>
);
