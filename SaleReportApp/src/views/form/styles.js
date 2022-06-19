import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    label: {
        color: 'white',
        margin: 20,
        marginLeft: 0,
    },
    button: {
        height: 40,
        backgroundColor: '#ec5990',
        borderRadius: 4,
    },
    submitBtnContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        marginVertical: 40,
        borderWidth: 2,
    },
    submitBtn: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderRadius: 4,
        backgroundColor: '#ec5990',
    },
    submitTxt: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        flexDirection: "column"
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        minWidth: 40,
        padding: 10,
        borderRadius: 4,
    },
    rangePicker: {
        flexDirection: "row"
    }, 
    dateSaleContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        borderWidth: 2,
        borderColor: "orange",
        padding: 10
    },
    dateField: {
        color: "blue",
        borderWidth: 2,
        padding: 10
    },
    saleField: {
        flexDirection: "column",
        textAlign: "center",
        borderWidth: 2
    }, 
    error: {
        color: "red",
        textAlign: "center",
        textDecorationLine: "underline",
        borderWidth: 2,
        borderColor: "red"
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
    },
});