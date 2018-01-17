/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { graphql, QueryRenderer } from 'react-relay';

import relayEnvironment from './relay/relayEnvironment';

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
  <QueryRenderer
    environment={relayEnvironment}
    query={graphql`
      query App_version_Query {
        apiVersion
      }
    `}
    render={({ props }) => (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          STORIQA APP ${props && props.apiVersion && `(api ver. ${props.apiVersion})`}
        </Text>
      </View>
    )}
  />
);

App.propTypes = {
  apiVersion: PropTypes.string,
};

App.defaultProps = {
  apiVersion: '',
};

export default App;

