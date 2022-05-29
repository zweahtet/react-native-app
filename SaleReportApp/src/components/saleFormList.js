import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button} from 'react-native';
import { useFieldArray } from "react-hook-form";
import DateSaleField from './dateSaleField';
import DateRangePicker from './dateRangePicker';

const DAY_IN_MINUTE = 24 * 60;
const DAY_IN_SECOND = DAY_IN_MINUTE * 60; 

export default function FormList ({ control, register, getValues, watch }) {
    
    const { fields } = useFieldArray({ 
        control, 
        name: "days" 
    });

    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date(startDate.valueOf() + 6*DAY_IN_SECOND*1000));

    useEffect(() => {
        console.log("useEffect watch: ", watch())
        console.log("useEffect fields:", fields)
    });

    return (
        <>
            <DateRangePicker 
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />  
            {fields.map((field, index) => {
                console.log(field.date)
                return (
                    <DateSaleField 
                        key={field.id}
                        index={index}
                        item={field}
                        control={control}
                        styles={styles}
                    />
                )
            })}
        </>
    )
}

const styles = StyleSheet.create({
    label: {
        color: 'white',
        margin: 20,
        marginLeft: 0,
    },
    button: {
        marginTop: 40,
        color: 'white',
        height: 40,
        backgroundColor: '#ec5990',
        borderRadius: 4,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
        backgroundColor: '#0e101c',
    },
    input: {
        backgroundColor: 'white',
        borderColor: 'none',
        height: 40,
        padding: 10,
        borderRadius: 4,
    },
});