import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './screens/Login';
import Map from './screens/Map';
import createEventOverlay from './screens/createEventOverlay';
const Stack = createStackNavigator();

function App({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="CreateEvent" component={createEventOverlay} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
