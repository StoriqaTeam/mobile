import React from 'react';
import { View } from 'react-native';


const statusStyle = {
  status: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
  on: {
    backgroundColor: 'green',
  },
  off: {
    backgroundColor: 'black',
  },
};

const StatusIndicator = ({ state }: { state: boolean}) => (
  <View style={[statusStyle.status, statusStyle.off, state && statusStyle.on]} />
);

export default StatusIndicator;
