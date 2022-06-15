import React from "react";
import { Text, View, StyleSheet, TextInput} from 'react-native';
import { Controller } from "react-hook-form";

export default function DateSaleField ({ key, index, item, control, styles, errors }) {

    if (Object.keys(errors).length != 0 && errors.weekSales[index]) {
        console.log("errors: ", errors.weekSales[index].sale)
    }

    return (
        <View>
            <Text>{new Intl.DateTimeFormat().format(item.saleDate)}</Text>
            <Controller
                control={control}
                render={({ field: {onBlur, onChange, value } }) => {
                    return (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Enter Sale here"
                        />
                    )
                }}
                name={`weekSales[${index}].sale`}             
                rules={{
                    required: "Sale is required.",
                    pattern: {
                        value: /\d+/,
                        message: "This input is number only."
                    }
                }}
            />
            {errors 
            && Object.keys(errors).length != 0
            && <Text>{errors.weekSales[index]?.sale.message}</Text>}  
        </View>
    )
}