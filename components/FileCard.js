import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Card, Title, Paragraph, Button} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
const GREEN = '#66f5a7';

export default function FileCard({cardTitle, fileName}) {
  return (
    <View style={styles.cardStyle}>
      <Text style={styles.titleStyle}>{fileName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    flex: 1,
    flexWrap: 'wrap',
    margin: 5,
    alignItems: 'center',
  },
  cardStyle: {
    borderWidth: 2,
    backgroundColor: GREEN,
    margin: 4,
    borderRadius: 5,
    borderLeftColor: 'steelblue',
    borderBottomColor: GREEN,
    borderRightColor: GREEN,
    borderTopColor: GREEN,
  },
});
