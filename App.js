/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

const App = () => (
  <SafeAreaView style={styles.header}>
    <View>
      <Text style={styles.heading}>Welcome</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  header: {
    marginVertical: 15,
    alignItems: 'center',
  },
});

export default App;
