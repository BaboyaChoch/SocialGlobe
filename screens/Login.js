import React, {useEffect, useState} from 'react';
import {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {addName, getName} from '../api/userApi';
import {GoogleSignin} from '@react-native-community/google-signin';
import {firebase} from '@react-native-firebase/auth';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  IconButton,
  Button,
  Colors,
} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
export default function ({navigation}) {
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1048065763270-92hn4h8ae9eq052mm24pihc1d9vbdjmg.apps.googleusercontent.com',
    });
  });

  async function onGoogleButtonPress() {
    // Get the users ID token
    setIsLoadingUser(true);
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoadingUser && <ActivityIndicator color={ORANGE} size="large" />}
      {!isLoadingUser && (
        <View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              bottom: 5,
            }}>
            {/* <Paragraph style={{color: BLUE, fontSize: 20}}>Sign Up</Paragraph> */}
          </View>
          <View style={{flexDirection: 'row'}}>
            <Button
              icon="login"
              onPress={() =>
                onGoogleButtonPress()
                  .then(() => {
                    setIsLoadingUser(false);
                    navigation.navigate('home');
                  })
                  .catch(err => console.log(err))
              }
              mode="contained"
              style={styles.button}
              title="Sign In with Google"
              color="#6beb34"
              accessibilityLabel="Sign In with Google"
              btnType="google"
              color={ORANGE}
              labelStyle={{color: WHITE}}>
              SignUp With Google
            </Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';

const TEXT_COLOR = ORANGE;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 34,
    flex: 1,
    width: '100%',
    backgroundColor: WHITE,
  },
  button: {
    width: 300,
    height: 40,
    borderWidth: 1,
    position: 'relative',
    color: TEXT_COLOR,
  },
  card: {backgroundColor: WHITE, elevation: 15},
});
