import React from "react";
import { Text, View, StyleSheet, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller } from "react-hook-form";

export default function DateSaleField ({ key, index, item, control, styles }) {

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        
    }

    return (
        <View>
            <Text>{item.date}</Text>            
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => 
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                }
                name={`list.${index}.sale`}             
                rules={{
                    required: true,
                }}
            />
        </View>
    )
}