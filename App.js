import React from 'react';
import {
  Alert,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';

const HandleTest = () => {
  if (NfcManager.isSupported('super')) {
    return <Text>Supported</Text>;
  } else {
    return <Text>Not supported</Text>;
  }
};

class App extends React.Component {
  componentDidMount() {
    console.log('before start');
    NfcManager.start().catch((error) => console.error('start error', error));
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      NfcManager.setAlertMessageIOS('I got your tag!');
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
    NfcManager.isSupported()
      .then((supported) => {
        if (supported) {
          this._startNfc();
        }
      })
      .catch((error) => console.error('isSupported error: ', error));
  }

  componentWillUnmount() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text>NFC Demo</Text>
          <HandleTest />
          <TouchableOpacity style={styles.buttonStart} onPress={this._test}>
            <Text>Test</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonCancel} onPress={this._cancel}>
            <Text>Cancel Test</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  _cancel = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
  };

  _test = async () => {
    try {
      await NfcManager.registerTagEvent()
        .then(Alert.alert('start'))
        .catch((error) => console.error(error));
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonStart: {
    padding: 10,
    width: 200,
    margin: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonCancel: {
    padding: 10,
    width: 200,
    margin: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default App;
