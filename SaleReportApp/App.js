import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/views/homescreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const createSaleReport = () => {
    
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="AFC Sale Report" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text style={styles.title}>Sale Report App</Text>
    //   <Button
    //     onPress={createSaleReport}
    //     title="Create Sale Report"
    //     color="#841584"
    //     accessibilityLabel="Create Sale Report"
    //   />
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
});
