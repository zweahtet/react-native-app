import React from "react";
import { Dimensions, StatusBar, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";

export default KeyboardAvoidingWrapper = (props) => {
    const screenHeight = Dimensions.get("screen").height
    const windowHeight = Dimensions.get("window").height
    
    return (
        <KeyboardAvoidingView 
            style={props.styles.containter}
            behavior={"position"}
            keyboardVerticalOffset={-10}
        >
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {props.children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}