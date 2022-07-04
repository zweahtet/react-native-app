import React from "react";
import { useWatch } from "react-hook-form";
import { Text, View } from "react-native";
import { sumSales } from "../utils/misc";
import { StyleSheet } from "react-native";

export default TotalSales = ({ control }) => {
    const salesFields = useWatch({ control, name: "weekSales"})
    const total = sumSales(salesFields)
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Total {total}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        flexDirection: "row",
        justifyContent: "center"
    },
    label: {
        color: "blue",
        fontStyle: "normal"
    }
})