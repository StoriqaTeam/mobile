//  @flow
import React from 'react';
import { Image, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import Button from '../../components/Buttons';
import ExpandedLayout from '../../layouts/ExpandedLayout';
import { LOGIN_BG_X } from '../../components/Image';
import StatusIndicator from '../../components/StatusIndicator';
import { StoreType } from '../../relay/types';
import { StoriqaIcon } from '../../components/Icons';


type PropsType = {
  stores?: StoreType[],
}

const Stores = ({ stores }: PropsType) => (
  <ExpandedLayout
    backgroundURL={LOGIN_BG_X}
    isAnimated
    navbar={{
      title: <Text style={{ fontFamily: 'SFProText-Light' }}>Navbar Title</Text>,
      rightButton: <StoriqaIcon
        name="person"
        size={20}
        color="#505050"
        onPress={Actions.profile}
        style={{ marginRight: 8 }}
      />,
   }}
  >
    <StoresList stores={stores} />
  </ExpandedLayout>
);

const StoresList = ({ stores }: PropsType) => (
  <View style={{ marginTop: 16 }}>
    {!stores &&
      <View>
        <Text>No stores found</Text>
      </View>
    }
    {stores && stores.map(store => (<StoreItem key={store.id} store={store} />))}
  </View>
);

type StorePropsType = {
  store: StoreType,
}

const StoreItem = ({ store }: StorePropsType) => (
  <View style={styles.storeWrapper}>
    <View style={styles.storeContentWrapper}>
      <StatusIndicator state={store.isActive} />
      <Text style={styles.storeTitle}>{store.name}</Text>
      <Text style={styles.storeShortDescription}>{store.shortDescription}</Text>
      {store.cover &&
        <Image source={{ uri: store.cover }} style={{ width: 50, height: 50 }} />
      }
    </View>
    <Button title="more..." onPress={() => Actions.store({ store })} />
  </View>
);


export default Stores;
