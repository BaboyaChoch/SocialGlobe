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

export default function Bookmarks() {
  const [userBookmarks, setUserBookmarks] = useState();
  const isFocused = useIsFocused();
  const onBookmarksRecieved = userBookmarks => {
    setUserBookmarks(userBookmarks);
  };

  useEffect(() => {
    getUserBookmarks(onBookmarksRecieved);
  }, [isFocused]);

  return (
    <SafeAreaView>
      <ScrollView>
        {userBookmarks.map(bookmark => (
          <Text>{bookmark.title}</Text>
        ))}
        <SectionList
          className={{SectionList}}
          sections={[
            {
              title: 'Party ',
              data: [
                'Location: 123 Mike St, Baton Rouge LA 70820',
                'Time: 8:00pm',
                'Date: 12/15/21',
              ],
            },
            {
              title: 'Study Session',
              data: [
                'Location: 3304 S Quad Dr, Baton Rouge, LA 70803',
                'Time: 5:00pm',
                'Date: 12/8/21',
              ],
            },
            {
              title: 'Study Session',
              data: [
                'Location: 3304 S Quad Dr, Baton Rouge, LA 70803',
                'Time: 5:00pm',
                'Date: 12/8/21',
              ],
            },
            {
              title: 'Study Session',
              data: [
                'Location: 3304 S Quad Dr, Baton Rouge, LA 70803',
                'Time: 5:00pm',
                'Date: 12/8/21',
              ],
            },
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />
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
