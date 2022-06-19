import React from "react";
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";

export default KeyboardAvoidingWrapper = (props) => {
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