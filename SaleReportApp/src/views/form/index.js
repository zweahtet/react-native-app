import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import FormList from '../../components/saleFormList';
import { DAY_IN_SECOND } from '../../constants/dayDateConst';
import { makeDateArray } from '../../utils/misc';

export default function Form() {

    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date(startDate.valueOf() + 6*DAY_IN_SECOND*1000));

    const { 
        control, 
        handleSubmit, 
        getValues, 
        register, 
        watch,
        reset,
        formState: {
            errors,
            isSubmitSuccessful
        }
    } = useForm({
        mode: "onChange",
        defaultValues: {
            weekSales: makeDateArray(startDate).map((d) => ({
                date: d.toDateString(),
                sale: 0
            }))
        }
    });

    console.log(isSubmitSuccessful)

    const onSubmit = (data) => {
        const fields = data.weekSales
        alert("button is pressed.")
        if (isSubmitSuccessful) {
            console.log("data", JSON.stringify(data))
        }
        console.log("fields", fields)
    };

    const onError = (errors, event) => {
        console.log("errors: ", errors)
    }

    useEffect(() => {
        reset()
    }, [isSubmitSuccessful])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text>Form</Text>
                <Text>Choose Start Time and End Time:</Text>
                <FormList {... {startDate, endDate, setStartDate, setEndDate, control, register, watch, errors } }/>
                
                <Button
                    title="Create"
                    // onPress={handleSubmit(() => {
                    //     try {
                    //         console.log("data: ", )
                    //     } catch (err) {
                    //         console.log("errors: ", err)
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
  