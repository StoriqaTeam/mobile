import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { StoreType } from '../../relay/types';
import MainLayout from '../../layouts/MainLayout';
import { LOGIN_BG_X } from '../../components/Image';


export default ({ store }: { store: StoreType }) => (
  <MainLayout
    backgroundURL={LOGIN_BG_X}
  >
    <View>
      {console.log('*** Store props: ', store)}
      <Text style={{ fontSize: 25 }}>{store.name}</Text>
      <TouchableOpacity onPress={Actions.pop}>
        <Text style={{ color: 'blue' }}>back</Text>
      </TouchableOpacity>
    </View>
  </MainLayout>
);
