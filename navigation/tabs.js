import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import UserProfile from '../screens/UserProfile';
import Map from '../screens/Map';
import createEventOverlay from '../screens/createEventOverlay';
import Bookmarks from '../screens/Bookmarks';
import agenda from '../screens/agenda';
import calendar from '../screens/calendar';

import {IconButton} from 'react-native-paper';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: BLUE,
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
                icon="map-marker-plus-outline"
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
      <Tab.Screen
        name="Agenda"
        component={agenda}
        options={{
          tabBarIcon: () => {
            return (
              <IconButton icon="view-agenda-outline" color={ICON_COLOR} size={ICON_SIZE} />
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
        name="Calendar"
        component={calendar}
        options={{
          tabBarIcon: () => {
            return (
              <IconButton icon="calendar-month" color={ICON_COLOR} size={ICON_SIZE} />
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
const GREEN = '#5dca73';
const BLUE = '#3366ff';
const ORANGE = '#e29e21';
const WHITE = '#f9f9f9';
const ICON_SIZE = 32;
const ICON_COLOR = WHITE;
const LIGHTBLUE = '#e2eaf0';

const styles = StyleSheet.create({
  iconStyles: {width: 15, height: 15},
});
export default Tabs;
