import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center"
    },
    welcomeCtn: {
        borderWidth: 2
    },
    welcomeLabel: {

    },
    buttonsCtn: {
        flexDirection: "column",
        flexWrap: "wrap",
        borderWidth: 2, 
    },
    button: {
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: "#841584",
        borderRadius: 4,
        margin: "1%",
        minWidth: "30%"
    },
    buttonLabel: {
        color: "white"
    }
})