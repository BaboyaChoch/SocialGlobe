import React, {useState} from 'react';
import {Chip, IconButton, Modal} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
export default function ReportEvent({
  eventId,
  visible,
  setVisible,
  eventReports,
}) {
  const [reports, setReports] = useState({
    Offensive: false,
    Harrassment: false,
    Unsafe: false,
    Scam: false,
  });
  return (
    <View style={styles.container}>
      <Chip
        onPress={() => {
          reports.Offensive = true;
        }}>
        Offensive Words
      </Chip>
      <Chip
        onPress={() => {
          reports.Harrassment = true;
        }}>
        Harrassment
      </Chip>
      <Chip
        onPress={() => {
          reports.Unsafe = true;
        }}>
        Unsafe
      </Chip>
      <Chip
        onPress={() => {
          reports.Scam = true;
        }}>
        Scam
      </Chip>
      <IconButton
        icon="arrow-back"
        onclick={() => {
          handleClose(false);
        }}></IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});
