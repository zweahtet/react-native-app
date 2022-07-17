import React, { useEffect } from "react";
import {Text, View, Button, StyleSheet, Platform, TouchableOpacity, Appearance} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DAY_IN_SECOND } from "../constants/dayDateConst";
import { Icon } from '@rneui/themed';

const colorScheme = Appearance.getColorScheme()

export default function DateRange( props ) {
    const [showPicker, setShowPicker] = React.useState(false)

    const handleConfirm = (date) => {
        props.setStartDate(date);
        props.setEndDate(new Date(date.valueOf() + 6*DAY_IN_SECOND*1000))
        setShowPicker(false)
    }

    const handleCancel = () => {
        setShowPicker(false)
    }

    const onPress = () => {
        setShowPicker(true)
    }

    return (
        <>
            <View style={props.styles.dateRangeHeaderContainer}>
                <Text style={props.styles.dateRangeHeader}>Start</Text>
                <Text>{props.startDate.toDateString()}</Text> 
            </View>
            <View style={props.styles.dateRangeHeaderContainer}>
                <Text style={props.styles.dateRangeHeader}>End</Text>
                <Text>{props.endDate.toDateString()}</Text>
            </View>
            <TouchableOpacity onPress={onPress} style={props.styles.smallBtnContainer}>
                <Text>Change Date</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={showPicker}
                mode="date"
                display="inline"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                date={props.startDate}
                isDarkModeEnabled
                value={props.startDate}
            />
        </>
    )
}