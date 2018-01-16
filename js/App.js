/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const gray = '#F5FCFF';
const gray2 = '#333333';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: gray,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: gray2,
    marginBottom: 5,
  },
});

const App = () => (
  <View style={styles.container}>
    <Text style={styles.instructions}>
      STORIQA APP
    </Text>
  </View>
);

export default App;

