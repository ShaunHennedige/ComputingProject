import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  adaptNavigationTheme,
  ActivityIndicator,
  Text,
  Modal,
  Portal,
} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthContext} from './util/AuthContext';
import {navigationRef} from './util/RootNavigation';
import Dashboard from './tabs/Dashborad';
import Auth from './auth/Auth';
import SignUp from './auth/SignUp';

const {DarkTheme} = adaptNavigationTheme({reactNavigationDark: DefaultTheme});

const LoadStatus = (props: {isLoading: boolean}) => {
  return (
    <Portal>
      <Modal
        visible={props.isLoading}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          alignItems: 'center',
        }}>
        <ActivityIndicator animating={true} />
        <Text variant="titleMedium">Loading</Text>
      </Modal>
    </Portal>
  );
};

const Main = () => {
  const {auth, loading} = React.useContext(AuthContext);
  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DarkTheme} ref={navigationRef}>
        <LoadStatus isLoading={loading} />
        <Stack.Navigator>
          {auth.logged ? (
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{headerShown: false}}
            />
          ) : (
            <>
              <Stack.Screen name="Welcome" component={Auth} />
              <Stack.Screen name="Sign Up" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Main;
