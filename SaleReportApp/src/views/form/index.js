import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// import { Button } from "@rneui/base"
import { useForm } from 'react-hook-form';
import FormList from '../../components/saleFormList';
import { DAY_IN_SECOND } from '../../constants/dayDateConst';
import DateRange from "../../components/dateRangePicker";
import { generateShareableExcel, makeDateArray, shareExcel } from '../../utils/misc';
import { formStyles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
                saleDate: d,
                saleAmount: undefined
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
        const sheetName = `CC763_MOL_9_Sales_Report`
        const shareableExcelURI = await generateShareableExcel(sheetName, sales)
        // we can store URI in AsyncStorage in Form screen and get that back and read the URI
        // from ExcelTable screen
        // shareExcel(shareableExcelURI)
        navigation.navigate("Table", {
            fileURI: shareableExcelURI,
            sheetName: sheetName,
            control: control
        })
    };

    const onError = (errors, event) => {
        console.log("errors: ", errors)
    }

    const getSales = async () => {
        // const result = await AsyncStorage.getItem(`${startDate}-${endDate}_weekSales`);
        console.log("result", result)
    }

    return (
        <KeyboardAwareScrollView> 
            <View style={formStyles.formContainer}>
                <View style={formStyles.dateRangeContainer}>
                    <DateRange 
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        styles={formStyles}
                    /> 
                </View>
                <View style={formStyles.formListContainer}>
                    <FormList {... {startDate, control, register, watch, errors, styles: formStyles, getValues } }/>
                </View>
                <View style={formStyles.submitBtnContainer}>
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit, onError)}
                        style={formStyles.submitBtn}
                    >
                        <Text style={formStyles.submitTxt}>
                            Create
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}
  