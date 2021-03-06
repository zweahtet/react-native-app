import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
    label: {
        color: 'white',
        margin: 20,
        marginLeft: 0,
    },
    smallBtnContainer: {
        height: 40,
        marginTop: 20,
        padding: 5,
        borderWidth: 2,
        borderRadius: 4
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
    formContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    saleInput: {
        backgroundColor: 'white',
        height: 40,
        minWidth: "45%",
        padding: 10,
        borderRadius: 4,
    },
    dateRangeContainer: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        alignItems: "center",
        borderWidth: 2,
        padding: 5,
        backgroundColor: "cyan"
    },
    dateRangeHeaderContainer: {
        flexDirection: "column",
        marginHorizontal: 3,
        padding: 5,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: "red",
        minWidth: 60
    },
    dateRangeHeader: {
        fontSize: 16
    },
    formListContainer: {
        flexDirection: "column",
        borderWidth: 2,
    },
    dateSaleContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderWidth: 2,
        borderColor: "orange",
        padding: 10
    },
    dateField: {
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 4,
        padding: 5
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
});