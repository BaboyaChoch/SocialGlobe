import {useIsFocused} from '@react-navigation/core';
import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  SectionList,
  ScrollView,
} from 'react-native';
import {getUserBookmarks} from '../api/bookmarksApi';
import InfoCard from './InfoCard';
import {firebase} from '@react-native-firebase/auth';

export default function Bookmarks() {
  const [userBookmarks, setUserBookmarks] = useState();
  const isFocused = useIsFocused();
  const user = firebase.auth().currentUser;

  const onBookmarksRecieved = bookmarks => {
    setUserBookmarks(bookmarks);
  };

  useEffect(() => {
    getUserBookmarks(onBookmarksRecieved);
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <InfoCard />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  SectionList: {
    padding: '15px',
  },
  sectionHeader: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
    fontSize: 25,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
    borderTopWidth: 2,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
