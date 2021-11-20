import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import UserProfile from '../screens/UserProfile';
import Map from '../screens/Map';
import createEventOverlay from '../screens/createEventOverlay';
import Bookmarks from '../screens/Bookmarks';

import {IconButton} from 'react-native-paper';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: WHITE,
          borderRadius: 0,
          height: 40,
        },
      }}>
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: () => {
            return (
              <IconButton
                icon="map-search"
                color={ICON_COLOR}
                size={ICON_SIZE}
              />
            );
          },
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarLabelStyle: {
            color: '#F9F9F9',
            fontSize: 13,
          },
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Create Event"
        component={createEventOverlay}
        options={{
          tabBarIcon: () => {
            return (
              <IconButton
                icon="calendar-plus"
                color={ICON_COLOR}
                size={ICON_SIZE}
              />
            );
          },
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarLabelStyle: {
            color: '#F9F9F9',
            fontSize: 13,
          },
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={Bookmarks}
        options={{
          tabBarIcon: () => {
            return (
              <IconButton icon="bookmark" color={ICON_COLOR} size={ICON_SIZE} />
            );
          },
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarLabelStyle: {
            color: '#F9F9F9',
            fontSize: 13,
          },
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarIcon: () => {
            return (
              <IconButton icon="account" color={ICON_COLOR} size={ICON_SIZE} />
            );
          },
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarLabelStyle: {
            color: '#F9F9F9',
            fontSize: 13,
          },
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};
const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ICON_SIZE = 32;
const ICON_COLOR = '#e29e21';
const WHITE = '#f9f9f9';

const styles = StyleSheet.create({
  iconStyles: {width: 15, height: 15},
});
export default Tabs;
