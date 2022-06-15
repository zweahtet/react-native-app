import React from "react";
import {Text, View, Button} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DAY_IN_MINUTE = 24 * 60;
const DAY_IN_SECOND = DAY_IN_MINUTE * 60; 

export default function DateRangePicker( props ) {
    const [isStartShow, setIsStartShow] = React.useState(false);
    const [isEndShow, setIsEndShow] = React.useState(false);

    const showPicker = (which) => {
        switch (which){
            case "start":
                setIsStartShow(true);
                break;
            case "end":
                setIsEndShow(true);
                break;
            default:
                setIsStartShow(false);
                setIsEndShow(false);
                break;
        }
    };

    const onStartChange = (event, date) => {
        const currentDate = date;
        props.setStartDate(currentDate);
        props.setEndDate(new Date(currentDate.valueOf() + 6*DAY_IN_SECOND*1000))
        setIsStartShow(false);
    }

    const onEndChange = (event, date) => {
        const currentDate = date;
        props.setEndDate(currentDate);
        setIsEndShow(false);
    }

    return (
        <>
            <Text>Start Date: {props.startDate.toDateString()}</Text>
            {!isStartShow && (
                <View>
                <Button 
                    color="purple"
                    title="Change" 
                    onPress={() => showPicker("start")}
                />
                </View>
            )}
            {isStartShow && (
                <DateTimePicker
                    value={props.startDate}
                    onChange={onStartChange}
                    mode="date"
                />
            )}
            <Text>End Date: {props.endDate.toDateString()}</Text>
            {!isEndShow && (
                <View>
                    <Button 
                        title="Change"
                        color="purple"
                        onPress={() => showPicker("end")}  
                    />
                </View>
            )}
            {isEndShow && (
                <DateTimePicker
                    value={props.endDate}
                    onChange={onEndChange}
                    mode="date"
                />
            )}
        </>
    )
}