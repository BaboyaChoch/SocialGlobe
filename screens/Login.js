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
  const [user, setUser] = useState();
  const [isLoggeIn, setIsLoggedIn] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1048065763270-92hn4h8ae9eq052mm24pihc1d9vbdjmg.apps.googleusercontent.com',
    });
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    }, []);
    console.log(user, isLoggeIn);
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
  const checkCurrentUser = () => {
    const current_user = firebase.auth().currentUser;
    if (current_user) {
      setUser(current_user);
      setIsLoggedIn(true);
    }
  };
  const signUserOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  };

  const UserAvatar = props => (
    <Avatar.Image
      size={50}
      style={{borderColor: 'gray', borderWidth: 1}}
      source={{
        uri: user.photoURL,
      }}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      {isLoadingUser && <ActivityIndicator size="large" color={ORANGE} />}
      {!isLoggeIn && !isLoadingUser && (
        <View style={{marginBottom: '200%'}}>
          <Button
            icon="login"
            onPress={() =>
              onGoogleButtonPress()
                .then(() => {
                  setUser(firebase.auth().currentUser);
                  setIsLoggedIn(true);
                  setIsLoadingUser(false);
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
            Login With Google
          </Button>
        </View>
      )}
      {isLoggeIn && (
        <View>
          <Card style={styles.card}>
            <Card.Title
              title={user.displayName}
              subtitle={user.email}
              left={UserAvatar}
              titleStyle={{color: TEXT_COLOR}}
            />
            <Card.Content>
              <Paragraph style={{color: BLUE}}>
                {'User Info and Stuff, Lorem Ipsum blashh blah blah'}
              </Paragraph>
            </Card.Content>
            <Card.Actions style={{justifyContent: 'flex-end'}}>
              <IconButton
                icon="logout"
                size={30}
                color={ORANGE}
                onPress={() => {
                  setIsLoggedIn(false);
                  setUser(null);
                  signUserOut();
                }}></IconButton>
            </Card.Actions>
          </Card>
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
    top: 300,
    color: TEXT_COLOR,
  },
  card: {backgroundColor: WHITE, elevation: 15},
});
