import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { StoreType } from '../../relay/types';


export default ({ store }: { store: StoreType }) => (
  <View>
    {console.log('*** Store props: ', store)}
    <Text style={{ fontSize: 25 }}>{store.name}</Text>
    <TouchableOpacity onPress={Actions.pop}>
      <Text style={{ color: 'blue' }}>back</Text>
    </TouchableOpacity>
  </View>
);
