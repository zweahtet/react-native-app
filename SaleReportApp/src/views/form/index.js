import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import FormList from '../../components/saleFormList';
import { DAY_IN_SECOND } from '../../constants/dayDateConst';
import { generateShareableExcel, makeDateArray, shareExcel } from '../../utils/misc';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Form({ navigation }) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(startDate.valueOf() + 6*DAY_IN_SECOND*1000));
    // const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

    const { 
        control, 
        handleSubmit, 
        getValues, 
        register, 
        watch,
        reset,
        trigger,
        formState: {
            errors,
            isSubmitSuccessful,
            isDirty,
            dirtyFields,
            isValid
        }
    } = useForm({
        mode: "onChange",
        defaultValues: {
            weekSales: makeDateArray(startDate).map((d) => ({
                day: d.getDay(),
                month: d.getMonth()+1,
                date: d.getDate(),
                year: d.getFullYear(),
                sale: 0
            }))
        }
    });

    const onSubmit = async (data, event) => {
        const sales = data.weekSales || []
        // if (isDirty) {
        //     const allSales = dirtyFields?.weekSales?.filter(field => field.sale)
        //     console.log("allSales: ", allSales)
        // }
        // await AsyncStorage.setItem(`${startDate}-${endDate}_weekSales`, JSON.stringify(sales)) 
        
        // if (isValid) {
        //     console.log("data", data)
        // }
        const fileName = "CC763_MOL_9_Report" + (startDate.getMonth()+1) + "-" + startDate.getDate()
        const shareableExcelURI = await generateShareableExcel(fileName, sales)
        // we can store URI in AsyncStorage in Form screen and get that back and read the URI
        // from ExcelTable screen
        // shareExcel(shareableExcelURI)
        navigation.navigate("Table", {
            fileURI: shareableExcelURI,
            fileName: fileName
        })
    };

    const onError = (errors, event) => {
        console.log("errors: ", errors)
    }

    const getSales = async () => {
        // const result = await AsyncStorage.getItem(`${startDate}-${endDate}_weekSales`);
        console.log("result", result)
    }

    // useEffect(() => {
    //     // reset()
    //     // console.log("dirtyFields: ", dirtyFields)
    // }, [])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text>Form</Text>
                <Text>Choose Start Time and End Time:</Text>
                <FormList {... {startDate, endDate, setStartDate, setEndDate, control, register, watch, errors } }/>
                
                <Button
                    title="Create"
                    // onPress={handleSubmit((data) => {
                    //     try {
                    //         onSubmit(data);
                    //     } catch (err) {
                    //         onError(err);
                    //     }
                    // })}
                    onPress={handleSubmit(onSubmit, onError)}
                />
            </ScrollView>
        </SafeAreaView>
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
        justifyContent: 'top',
        padding: 8,
    },
    input: {
        backgroundColor: 'white',
        borderColor: 'none',
        height: 40,
        padding: 10,
        borderRadius: 4,
    },
});
  