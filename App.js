import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import Login from './screens/Login';
import Map from './screens/Map';
import EventDetailsPage from './screens/EventDetailsPage';
import createEventOverlay from './screens/createEventOverlay';
const Stack = createStackNavigator();

function App({navigation}) {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="CreateEvent" component={createEventOverlay} />
          <Stack.Screen name="EventDetailsPage" component={EventDetailsPage} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
