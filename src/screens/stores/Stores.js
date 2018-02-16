import React from 'react';
import { Image, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import Button from '../../components/Buttons';
import MainLayout from '../../layouts/MainLayout';
import { LOGIN_BG_X } from '../../components/Image';
import StatusIndicator from '../../components/StatusIndicator';
import { StoreType } from '../../relay/types';


type PropsType = {
  stores: StoreType[],
}

const Stores = ({ stores }: PropsType) => (
  <MainLayout
    backgroundURL={LOGIN_BG_X}
  >
    <View style={styles.wrapper}>
      {stores.map(store => (
        <View key={store.id} style={styles.storeWrapper}>
          <View style={styles.storeContentWrapper}>
            <StatusIndicator state={store.isActive} />
            <Text style={styles.storeTitle}>{store.name}</Text>
            <Text style={styles.storeShortDescription}>{store.shortDescription}</Text>
            <Image source={{ uri: store.cover }} style={{ width: 50, height: 50 }} />
          </View>
          <Button title="more..." onPress={() => Actions.store({ store })} />
        </View>
      ))}
    </View>
  </MainLayout>
);


export default Stores;
