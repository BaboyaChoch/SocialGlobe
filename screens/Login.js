import React from 'react';
import {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import {addName, getName} from '../api/userApi';
export default class Login extends Component {
  state = {
    userName: 'SOCIAL GLOBE TO THE MOON',
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <TextInput
            ref="inputName"
            style={styles.input}
            placeholder="Name"></TextInput>
          <View style={styles.fixToText}>
            <Button
              onPress={() => {
                addName({
                  name: this.state.userName,
                });
              }}
              style={styles.button}
              title="Save"
              color="#ffafaf"
              accessibilityLabel="Save Name"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {},
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
