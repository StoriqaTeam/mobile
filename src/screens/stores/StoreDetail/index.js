//  @flow
import React from 'react';
import { Image, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { StoreType } from '../../../relay/types';
import ExpandedLayout from '../../../layouts/ExpandedLayout';
import { LOGIN_BG_X } from '../../../components/Image';
import { HeaderButton } from '../../../components/Buttons';
import { StoriqaIcon } from '../../../components/Icons';
import StatusIndicator from '../../../components/StatusIndicator';


type PropsType = {
  store: StoreType,
}

class StoreDetail extends React.Component<PropsType> {
  static navigationOptions = () => ({
    title: 'Store Details',
  });

  render() {
    const { store } = this.props;
    return (
      <ExpandedLayout
        backgroundURL={LOGIN_BG_X}
        isAnimated
        navbar={{
          title: <Text>{store.name}</Text>,
          leftButton: <HeaderButton title="back" onPress={Actions.pop} />,
          rightButton: <StoriqaIcon name="person" size={20} color="#505050" onPress={Actions.profile} style={{ marginRight: 8 }} />,
        }}
      >
        <View style={styles.contentWrapper}>
          <StatusIndicator state={store.isActive} />
          {store.cover && <Image source={{ uri: store.cover }} style={{ width: 50, height: 50 }} />}
          {store.logo && <Image source={{ uri: store.logo }} style={{ width: 50, height: 50 }} />}
          <Text>{store.shortDescription}</Text>
          <Text>{store.longDescription}</Text>
        </View>
      </ExpandedLayout>
    );
  }
}


export default StoreDetail;
