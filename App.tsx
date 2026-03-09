import './global.css';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { GluestackUIProvider } from './components/ui/gluestack-ui-provider';
import { LoginScreen } from './src/screens/auth/Login';
import { HomeScreen } from './src/screens/HomeScreen';
import { AuthProvider } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <GluestackUIProvider mode="system">
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>

          <StatusBar style="auto" />
        </SafeAreaProvider>
      </GluestackUIProvider>
    </AuthProvider>
  );
}
