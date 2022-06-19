import React, { useState, useEffect } from 'react';
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
        errors,
        styles
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