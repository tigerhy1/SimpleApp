import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flexDirection: 'row', 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default Spinner;
