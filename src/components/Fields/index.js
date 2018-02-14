// @flow

import React from 'react';
import type { Node } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';


type ValidatedFieldType = {
  component: Node,
  isChanged: boolean,
  isValid: boolean,
  errorMessage: string,
  okMessage: string,
}

export default ({
  component,
  isChanged,
  isValid,
  errorMessage,
  okMessage,
}: ValidatedFieldType) => (
  <View style={styles.textInputWrapper}>
    {component}
    {isChanged &&
      <View style={styles.validationStatusWrapper}>
        <Text>{isValid ? okMessage : errorMessage }</Text>
      </View>
    }
  </View>
);