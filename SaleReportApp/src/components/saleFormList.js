import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button} from 'react-native';
import { useFieldArray } from "react-hook-form";
import DateSaleField from './dateSaleField';
import { DAY_IN_SECOND } from '../constants/dayDateConst';
import { makeDateArray } from '../utils/misc';

export default function FormList (
    { startDate, 
        control, 
        register, 
        getValues, 
        watch,
        errors 
    }) {

    const { fields, replace } = useFieldArray({ 
        control, 
        name: "weekSales" 
    });

    useEffect(() => {
        const newDateArr = makeDateArray(startDate);
        const newFields = fields.map((field, index) => {
            return {
                saleDate: newDateArr[index],
                id: field.id,
                saleAmount: field.saleAmount
            }
        })
        replace(newFields)
    }, [startDate]);

    return (
        <>
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