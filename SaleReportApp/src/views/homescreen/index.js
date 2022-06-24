import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { homeStyles } from './styles';

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
        <View style={homeStyles.container}>
            <View style={homeStyles.welcomeCtn}>
                <Text>Welcome, Daw Cho!</Text>
                <Text>Store Id</Text>
                <Text>Store Name</Text> 
            </View>
            <View style={homeStyles.buttonsCtn}>
                <TouchableOpacity
                    onPress={createSaleReport}
                    style={homeStyles.button}
                >
                    <Text style={homeStyles.buttonLabel}>
                        Create Sale Report
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={openHistory}
                    style={homeStyles.button}
                >
                    <Text style={homeStyles.buttonLabel}>
                        History
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={openSetting}
                    style={homeStyles.button}
                >
                    <Text style={homeStyles.buttonLabel}>
                        Setting
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}