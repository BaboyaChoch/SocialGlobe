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
  PermissionsAndroid,
  Platform,
  Alert,
  BackHandler,
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
import Geolocation from 'react-native-geolocation-service';

export default function Login({navigation}) {
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [locationPermissionResult, setLocationPermissionResult] =
    useState('not_granted');
  async function onGoogleButtonPress() {
    // Get the users ID token
    setIsLoadingUser(true);
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const locationPermissionMissingAlert = () => {
    Alert.alert(
      'LOCATION PERMISSIONS NOT GRANTED',
      'User cannot proceeed until location permissions are granted',
      [
        {
          text: 'Grant Permission',
          onPress: () => requestLocationPermission(),
          style: 'default',
        },
        {
          text: 'Exit',
          onPress: () => BackHandler.exitApp(),
          style: 'destructive',
        },
      ],
    );
  };

  const checkPermissions = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    console.log(granted);
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      setLocationPermissionResult(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLocationPermissionGranted(true);
        GoogleSignin.configure({
          webClientId:
            '1048065763270-92hn4h8ae9eq052mm24pihc1d9vbdjmg.apps.googleusercontent.com',
        });
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  });

  // useEffect(() => {
  //   console.log(locationPermissionGranted, locationPermissionResult);
  //   if (!locationPermissionGranted) {
  //     locationPermissionMissingAlert();
  //   }
  // }, [locationPermissionResult]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoadingUser && <ActivityIndicator color={ORANGE} size="large" />}
      {!isLoadingUser && locationPermissionGranted && (
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
  alertContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
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
