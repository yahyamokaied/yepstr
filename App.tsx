import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

import FetchData from './src/FetchData';

const App = () => {

  return (
    <SafeAreaView style={styles.Container}>
      <FetchData />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#c4c4c4',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App;
