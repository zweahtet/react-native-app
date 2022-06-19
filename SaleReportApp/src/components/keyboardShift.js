import { PropTypes } from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Keyboard, StyleSheet, TextInput, UIManager } from 'react-native';

const { State: TextInputState } = TextInput;

export default KeyboardShift = (props) => {
    const shift = useRef(new Animated.Value(0)).current
 
    useEffect(() => {
        const keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
        const keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
        return () => {
            keyboardDidShowSub.remove();
            keyboardDidHideSub.remove();
        }
    })
    
    const handleKeyboardDidShow = (event) => {
        console.log("event: ", JSON.stringify(event.nativeEvent))
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
        <Animated.View style={[styles.container, { transform: [{translateY: shift}] }]}>
            {props.children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
container: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
}
});

KeyboardShift.propTypes = {
    children: PropTypes.func.isRequired,
};