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
  Divider,
} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function UserProfile({navigation}) {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(firebase.auth().currentUser);
    console.log(user);
  });

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
      <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              height: 60,
              position: 'relative',
              bottom: 260,
              paddingBottom: 0,
              }}>
            <IconButton
              icon="arrow-left"
              color={BLUE}
              size={40}
              onPress={() => {
                navigation.navigate('Map');
              }}
              style={{
                position: 'relative',
                right: 100,
              }}
            />
            <Paragraph
            style={{
              fontSize: 20,
              position: 'relative',
              top: 25,
              right: 100,
            }}
            >Return to Map</Paragraph>
          </View>     
      {user && (
        <View style={{
          flexDirection: 'row',
          position: 'relative',
          bottom: 50,
        }}>
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
                  signUserOut();
                  navigation.navigate('Login');
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
    flexDirection: 'column',
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
