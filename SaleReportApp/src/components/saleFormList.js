import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button} from 'react-native';
import { useFieldArray } from "react-hook-form";
import DateSaleField from './dateSaleField';
import DateRangePicker from './dateRangePicker';
import { DAY_IN_SECOND } from '../constants/dayDateConst';
import { makeDateArray } from '../utils/misc';

export default function FormList (
    { startDate, 
        endDate,
        setStartDate,
        setEndDate, 
        control, 
        register, 
        getValues, 
        watch,
        errors 
    }) {

    const { fields, update, replace } = useFieldArray({ 
        control, 
        name: "weekSales" 
    });
    // console.log("watch : ", watch())

    useEffect(() => {
        const tempArr = makeDateArray(startDate);
        const newFields = fields.map((field, index) => {
            return {
                date: tempArr[index].getDate(),
                day: tempArr[index].getDay(),
                month: tempArr[index].getMonth()+1,
                id: field.id,
                year: tempArr[index].getFullYear(),
                sale: field.sale
            }
        })
        replace(newFields)
    }, [startDate]);

    return (
        <>
            <DateRangePicker 
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />  
            {fields.map((field, index) => {
                return (
                    <DateSaleField 
                        key={field.id}
                        index={index}
                        item={field}
                        control={control}
                        styles={styles}
                        errors={errors}
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