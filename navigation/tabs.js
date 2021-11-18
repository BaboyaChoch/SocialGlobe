import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import Login from '../screens/Login';
import Map from '../screens/Map';
import createEventOverlay from '../screens/createEventOverlay';
import Bookmarks from '../screens/Bookmarks';

import {IconButton, Colors} from 'react-native-paper';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: BLUE,
          borderRadius: 0,
          height: 35,
          //activeTintColor: '#F2C777',
          //inactiveTintColor: '#0468BF',
          //activeBackgroundColor: '#D95959',
          //inactiveBackgroundColor: '#022859',
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
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
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
        }}
      />
    </Tab.Navigator>
  );
};
const GREEN = '#19a86a';
const BLUE = '#002f4c';
const ICON_SIZE = 27;
const ICON_COLOR = '#e29e21';
const styles = StyleSheet.create({
  iconStyles: {width: 15, height: 15},
});
export default Tabs;
