import {useNavigation} from '@react-navigation/core';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AppActionCenter({style, handleSearch}) {
  const navigation = useNavigation();
  return (
    <ActionButton
      buttonColor={BLUE}
      style={style}
      size={45}
      useNativeFeedback={true}
      useNativeDriver={true}>
      <ActionButton.Item
        buttonColor="#9b59b6"
        title="Search"
        onPress={() => handleSearch(true)}>
        <Icon name="magnify" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#3498db"
        title="Notifications"
        onPress={() => {}}>
        <Icon name="bell" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#1abc9c"
        title="Account"
        onPress={() => navigation.navigate('UserProfile')}>
        <Icon name="account" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
  );
}

const GREEN = '#5dca73';
const BLUE = '#3366ff';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
