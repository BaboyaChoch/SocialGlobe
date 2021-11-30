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
import {getAllBookmarkEvents, getUserBookmarks} from '../api/bookmarksApi';
import InfoCard from './InfoCard';
import {firebase} from '@react-native-firebase/auth';
import {getAnEvent} from '../api/mapsApi';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addToUserBookmarks} from '../api/bookmarksApi';
import {Colors} from 'react-native-paper';
import AppColors from '../components/AppColors';

export default function Bookmarks() {
  const [userBookmarks, setUserBookmarks] = useState();
  const isFocused = useIsFocused();
  const user = firebase.auth().currentUser;
  const [eventsInfo, setEventsInfo] = useState([]);
  const [isBookmarkReady, setIsBookmarkReady] = useState(false);

  const onBookmarksRecieved = bookmarks => {
    setUserBookmarks(bookmarks);
    getAllBookmarkEvents(bookmarks, onEventInfoRecieved);
  };

  const onEventInfoRecieved = events => {
    if (
      events[0] != null &&
      events != null &&
      events != undefined &&
      events.length > 0
    ) {
      setIsBookmarkReady(true);
      setEventsInfo(events);
    }
  };

  useEffect(() => {
    getUserBookmarks(onBookmarksRecieved);
  }, [isFocused]);

  return (
    <SafeAreaView>
      <ScrollView>
        {isBookmarkReady ? (
          eventsInfo.map(
            (details, index) => (
              console.log(details),
              (
                <InfoCard
                  key={index}
                  eventDetails={details}
                  isBookmark={true}
                />
              )
            ),
          )
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '50%',
            }}>
            <Icon
              name="bookmark"
              style={styles.bookmarkIcon}
              size={300}
              color={Colors.grey400}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: AppColors.BLUE,
              }}>
              No Bookmarks!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
  {
    /* <SafeAreaView >
       <ScrollView> <InfoCard /> </ScrollView> 
    </SafeAreaView> */
  }
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
  bookmarkIcon: {},
});
