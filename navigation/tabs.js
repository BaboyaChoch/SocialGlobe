import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Login from '../screens/Login';
import Map from '../screens/Map';
import createEventOverlay from '../screens/createEventOverlay';
import Bookmarks from '../screens/Bookmarks';

const Tab = createBottomTabNavigator();

const Tabs = () =>  {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#0468BF',
                    borderRadius: 0,
                    height: 50,              
                    //activeTintColor: '#F2C777',
                    //inactiveTintColor: '#0468BF',
                    //activeBackgroundColor: '#D95959',
                    //inactiveBackgroundColor: '#022859',                  
                },
            }}
            >
            <Tab.Screen name="Home" component = {Login}
                options={{
                    tabBarIcon: () => {
                        return (
                            <Image
                                style={{width: 30, height: 30 }}
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
                                }}
                            />
                        )
                    },
                    headerShown: false,
                    tabBarLabelStyle: {
                        color: '#F2C777',
                        fontSize: 13,
                        
                    }
                }}
            />
            <Tab.Screen name="Map" component = {Map}
            options={{
                tabBarIcon: () => {
                    return (
                        <Image
                            style={{width: 30, height: 30 }}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
                            }}
                        />
                    )
                },
                headerShown: false,
                tabBarLabelStyle: {
                    color: '#F2C777',
                    fontSize: 13,
                }
            }}/>
            <Tab.Screen name="Create Event" component = {createEventOverlay}
            options={{
                tabBarIcon: () => {
                    return (
                        <Image
                            style={{width: 30, height: 30 }}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
                            }}
                        />
                    )
                },
                headerShown: false,
                tabBarLabelStyle: {
                    color: '#F2C777',
                    fontSize: 13,
                }
            }}/>
            <Tab.Screen name="Bookmarks" component = {Bookmarks}
                options={{
                    tabBarIcon: () => {
                        return (
                            <Image
                                style={{width: 30, height: 30 }}
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
                                }}
                            />
                        )
                    },
                    tabBarLabelStyle: {
                        color: '#F2C777',
                        fontSize: 13,
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;