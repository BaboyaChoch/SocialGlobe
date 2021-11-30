import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EventDetailsPage from './screens/EventDetailsPage';
import Tabs from './navigation/tabs';
import Login from './screens/Login';
import EventDescriptionAndImageSelect from './screens/EventDescriptionAndImageSelect';
import EventAddressSelection from './screens/EventAddressSelection';
import messages from './screens/messages';
import agenda from './screens/agenda';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

import UserProfile from './screens/UserProfile';
const Stack = createStackNavigator();
function App({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="home" component={Tabs} />
        <Stack.Screen name="EventDetailsPage" component={EventDetailsPage} />
        <Stack.Screen
          name="EventDescriptionAndImageSelect"
          component={EventDescriptionAndImageSelect}
        />
        <Stack.Screen
          name="EventAddressSelection"
          component={EventAddressSelection}
        />
        <Stack.Screen name="Agenda" component={agenda} />
        <Stack.Screen name="Messages" component={messages} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
