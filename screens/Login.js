import React, { useEffect } from 'react';
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
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

export default function ({navigation}) {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1048065763270-92hn4h8ae9eq052mm24pihc1d9vbdjmg.apps.googleusercontent.com',
    });
  })

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
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
      position: 'relative',
      top: 300,
    },
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          onPress={() => onGoogleButtonPress().then(() => navigation.navigate('Map'))}
          style={styles.button}
          title="Sign In with Google"
          color="#6beb34"
          accessibilityLabel="Sign In with Google"
          btnType="google"
          color="#de4d41"
        />
      </View>
    </SafeAreaView>
  );
}
