import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/views/homescreen';
import Form from './src/views/form';
import History from './src/views/history';
import Setting from './src/views/setting';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions = {{
          headerStyle: {
            backgroundColor: '#228CDB'
          },
            headerTintColor: '#fff'
        }} 
        initialRouteName="Home"
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{title: "AFC Sale Report"}}
        />
        <Stack.Screen 
          name="Form" 
          component={Form} 
          options={{title: "Report Form"}}
        />
        <Stack.Screen 
          name="History" 
          component={History} 
          options={{title: "History"}}
        />
        <Stack.Screen 
          name="Setting" 
          component={Setting} 
          options={{title: "Setting"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}