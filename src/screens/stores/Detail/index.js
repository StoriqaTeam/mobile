import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { NavigationState } from 'react-navigation/src/TypeDefinition';

type ScreenType = {
  navigation: NavigationState,
}

export default ({ navigation: { navigate } }: ScreenType) => (
  <View>
    <Text style={{ fontSize: 25 }}>Store Detail</Text>
    <TouchableOpacity onPress={() => navigate('List')}>
      <Text style={{ color: 'blue' }}>List</Text>
    </TouchableOpacity>
  </View>
);
