import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Chip} from 'react-native-paper';

export default function MapFilterOptions({onPress}) {
  const chipActionOnPress = onPress;
  const [isFundraisersSelected, setIsFundraisersSelected] = useState(false);
  const [isNearBySelected, setIsNearbySelected] = useState(false);
  const [isFairsSelected, setIsFairsSelected] = useState(false);
  const [isSportsSelected, setIsSportsSelected] = useState(false);
  const [isGamingSelected, setIsGamingSelected] = useState(false);
  const [isSeminarsSelected, setIsSeminarsSelected] = useState(false);

  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}>
      <Chip
        icon="string-lights"
        mode={CHIP_TYPE}
        style={styles.chipStyle}
        selected={false}
        selectedColor="red"
        onLongPress={() => setIsFairsSelected(false)}
        onClose={() => setIsFairsSelected(false)}
        closeIcon={CLOSE_ICON}
        onPress={() => {
          chipActionOnPress('fair');
          setIsFairsSelected(true);
        }}>
        Fairs
      </Chip>
      <Chip
        icon="football"
        mode={CHIP_TYPE}
        style={styles.chipStyle}
        selected={isSportsSelected}
        onPress={() => {
          chipActionOnPress('sport');
          setIsSportsSelected(true);
        }}>
        Sports
      </Chip>
      <Chip
        icon="presentation"
        mode={CHIP_TYPE}
        style={styles.chipStyle}
        selected={isSeminarsSelected}
        onPress={() => {
          chipActionOnPress('seminar');
          setIsSeminarsSelected(true);
        }}>
        Seminars
      </Chip>
      <Chip
        icon="handshake"
        mode={CHIP_TYPE}
        selected={isFundraisersSelected}
        closeIcon="exit"
        style={styles.chipStyle}
        onPress={() => {
          chipActionOnPress('fundraiser');
          setIsFundraisersSelected(true);
        }}>
        Fundraisers
      </Chip>
    </ScrollView>
  );
}
const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';
const CHIP_TYPE = 'outlined';
const CLOSE_ICON = 'close';
styles = StyleSheet.create({
  container: {
    position: 'absolute', //use absolute position to show button on top of the map
    alignSelf: 'flex-start',
    flexDirection: 'row',
    //margin: 2,
  },
  chipStyle: {
    margin: 3,
    marginTop: 10,
    backgroundColor: WHITE,
    color: ORANGE,
  },
});
