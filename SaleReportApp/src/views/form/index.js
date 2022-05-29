import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { useForm } from 'react-hook-form';
import FormList from '../../components/saleFormList';

const defaultValues = {
    days: Array.from(Array(7).keys()).map((d) => ({
        date: d,
        sale: 0
    }))
};

export default function Form() {
    const { 
        control, 
        handleSubmit, 
        getValues, 
        register, 
        watch
    } = useForm({
        mode: "onChange",
        defaultValues
    });

    const onSubmit = (data) => {
        alert("button is pressed.")
        console.log("data", JSON.stringify(data))
    };

    return (
        <View style={styles.container}>
            <Text>Form</Text>
            <Text>Choose Start Time and End Time:</Text>
            <FormList 
                {...{ control, register, getValues, watch }}
            />
            
            <Button
                title="Create"
                onPress={handleSubmit(onSubmit)}
            />
        </View>
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
  