/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS } from './src/screen';
import { store } from './src/utils/createStore';
import _ from 'lodash'
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { getScaleSize } from './src/constants/scaleSize';

const { Navigator, Screen } = createStackNavigator();

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: getScaleSize(12),
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: getScaleSize(12),
      }}
    />
  ),
  info: (props: any) => (
    <InfoToast
      {...props}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: getScaleSize(12),
      }}
    />
  ),
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
    <Provider store={store}>
      <View style={styles.container}>

        <NavigationContainer
          fallback={<ActivityIndicator color="blue" size="large" />}>
          <Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false
            }}
            initialRouteName={SCREENS.LoginScreen.identifier}
          >
            {_.toArray(SCREENS).map((item: any, index: number) => {

              return item.component ? (
                <Screen
                  key={item.identifier}
                  name={item.identifier}
                  component={item.component}
                />
              ) : null;
            })}
          </Navigator>
        </NavigationContainer>
        <Toast config={toastConfig} />
      </View>
    </Provider>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0
  }
});

export default App;
