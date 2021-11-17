import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  SectionList
} from 'react-native';
const styles = StyleSheet.create({
  SectionList: {
      padding: '15px'
  },
  sectionHeader: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
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

export default function Bookmarks() {

  return (
    <SafeAreaView>
    <View>
    <SectionList className={{SectionList}}
          sections={[
            {title: 'Party ', data: ['Location: 123 Mike St, Baton Rougem LA 70820', 'Time: 8:00pm', 'Date: 12/15/21']},
            {title: 'Study Session', data: ['Location: 3304 S Quad Dr, Baton Rouge, LA 70803', 'Time: 5:00pm', 'Date: 12/8/21']},
            {title: 'Study Session', data: ['Location: 3304 S Quad Dr, Baton Rouge, LA 70803', 'Time: 5:00pm', 'Date: 12/8/21']},
            {title: 'Study Session', data: ['Location: 3304 S Quad Dr, Baton Rouge, LA 70803', 'Time: 5:00pm', 'Date: 12/8/21']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
    </View>
  </SafeAreaView>
  );
}
