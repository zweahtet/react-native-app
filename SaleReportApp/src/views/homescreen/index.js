import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function HomeScreen({props, navigation}) {
    const createSaleReport = () => {
        navigation.navigate('Form')
    }

    const openHistory = () => {
        navigation.navigate('History')
    }

    const openSetting = () => {
        navigation.navigate('Setting')
    }

    return (
        <View>
            <Text>Home</Text>
            <Button
                onPress={createSaleReport}
                title="Create Sale Report"
                color="#841584"
                accessibilityLabel="Create Sale Report"
            />
            <Button
                onPress={openHistory}
                title="History"
                color="#841584"
                accessibilityLabel="History"
            />
            <Button
                onPress={openSetting}
                title="Setting"
                color="#841584"
                accessibilityLabel="Setting"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
      color: 'white',
      margin: 20,
      marginLeft: 0,
    },
    button: {
      marginTop: 40,
      color: 'white',
      height: 40,
      backgroundColor: '#ec5990',
      borderRadius: 4,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 8,
      backgroundColor: '#0e101c',
    },
    input: {
      backgroundColor: 'white',
      borderColor: 'none',
      height: 40,
      padding: 10,
      borderRadius: 4,
    },
});
  