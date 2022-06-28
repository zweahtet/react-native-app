import React from "react";
import { Text, View, TextInput} from 'react-native';
import { Controller, useWatch } from "react-hook-form";

export default function DateSaleField ({ index, item, control, styles, errors }) {

    if (Object.keys(errors).length != 0 && errors.weekSales[index]) {
        console.log("errors: ", errors.weekSales[index].sale)
    }
    // const handlePress = (eve) => {
    //     console.log(eve.nativeEvent.locationX)
    // }

    return (
        <View style={styles.dateSaleContainer}>
            <View>
                <Text style={styles.dateField}>{new Intl.DateTimeFormat().format(item.saleDate)}</Text>
            </View>
            <View style={styles.saleField}>
                <Controller
                    control={control}
                    render={({ field }) => {
                        return (
                            <TextInput
                                // defaultValue={"0"}
                                style={styles.input}
                                onBlur={field.onBlur}
                                onChangeText={field.onChange}
                                value={field.value}
                                placeholder="Enter Sale here"
                            />
                        )
                    }}
                    name={`weekSales[${index}].saleAmount`}             
                    rules={{
                        required: "Sale is required",
                        pattern: {
                            value: /\d+/,
                            message: "This input is number only."
                        }
                    }}
                />
                <Text style={styles.error}>
                    {errors && Object.keys(errors).length != 0
                    && <Text>{errors.weekSales[index]?.saleAmount.message}</Text>}  
                </Text>
            </View>
            
        </View>
    )
}