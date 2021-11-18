import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EventDetailsPage from './screens/EventDetailsPage';
import Tabs from './navigation/tabs';
import Login from './screens/Login';
const Stack = createStackNavigator();
function App({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="root" component={Tabs} />
        <Stack.Screen name="EventDetailsPage" component={EventDetailsPage} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
