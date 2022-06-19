import React from "react";
import {Text, View, Button, StyleSheet} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DAY_IN_SECOND } from "../constants/dayDateConst";
import { styles } from "../views/form/styles";

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
            <View>
                <Text>Start Date: {props.startDate.toDateString()}</Text>
                {!isStartShow && (
                    <View style={styles.button}>
                        <Button
                            color={"white"}
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
            </View>
            <View>
                <Text>End Date: {props.endDate.toDateString()}</Text>
                {!isEndShow && (
                    <View style={styles.button}>
                        <Button 
                            title="Change"
                            color="white"
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
            </View>
        </>
    )
}