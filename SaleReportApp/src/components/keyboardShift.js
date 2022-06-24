import { PropTypes } from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { ScrollView, Animated, Dimensions, Keyboard, StyleSheet, TextInput, UIManager, TouchableWithoutFeedback } from 'react-native';

const { State: TextInputState } = TextInput;

export default KeyboardShift = (props) => {
    const ref = useRef(new Animated.Value(0))
    const shift = ref.current
 
    useEffect(() => {
        const keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
        const keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
        return () => {
            keyboardDidShowSub.remove();
            keyboardDidHideSub.remove();
        }
    })
    
    const handleKeyboardDidShow = (event) => {
        console.log("native event :", event)
        const { height: windowHeight } = Dimensions.get("window");
        const keyboardHeight = event.endCoordinates.height;
        const currentlyFocusedField = TextInputState.currentlyFocusedInput();
        UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
            const fieldHeight = height;
            const fieldTop = pageY;
            const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
            if (gap >= 0) {
                return;
            }
            Animated.timing(
                shift,
                {
                    toValue: gap,
                    duration: 1000,
                    useNativeDriver: true,
                }
            ).start();
        });
    }

    const handleKeyboardDidHide = () => {
        Animated.timing(
            shift,
            {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }
        ).start();
    }
    

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Animated.View style={[props.styles.container, { transform: [{translateY: shift}] }]}>
                    {props.children}
                </Animated.View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}


KeyboardShift.propTypes = {
    children: PropTypes.func.isRequired,
};