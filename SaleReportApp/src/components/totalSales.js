import React from "react";
import { useWatch } from "react-hook-form";
import { Text } from "react-native";
import { sumSales } from "../utils/misc";

export default TotalSales = ({ control }) => {
    const salesFields = useWatch({ control, name: "weekSales"})
    const total = sumSales(salesFields)
    return (
        <Text>Total {total}</Text>
    )
}