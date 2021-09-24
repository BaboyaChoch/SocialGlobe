import React from 'react';
import {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import {addName, getName} from '../api/userApi';
export default function ({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          onPress={() => navigation.navigate('Map')}
          style={styles.button}
          title="Map"
          color="#6beb34"
          accessibilityLabel="Save Name"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 34,
  },
  button: {
    width: 300,
    height: 40,
    borderWidth: 1,
  },
});
