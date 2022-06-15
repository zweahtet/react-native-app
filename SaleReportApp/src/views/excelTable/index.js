import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { readExcel } from '../../utils/misc';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import * as MailComposer from "expo-mail-composer"

export default function ExcelTable({ navigation, route }) {
    const [ data, setData ] = useState([])
    const [ storeID, storeName, ...body ] = data
    const { fileURI, fileName } = route.params
    
    useEffect(() => {
        const promise = readExcel(fileURI, fileName)
        promise.then(data => setData(data))
        console.log("excel renders")
    }, [])
    
    // "account@afcsushi.com"
    const onSent = () => {
        console.log("hello")
        MailComposer.composeAsync({
            recipients: ["zweahtet2014@gmail.com"],
            subject: fileName,
            attachments: [fileURI],
            isHtml: true,
            body: "Hi, <br/> Please see the attached for Sushi sales. <br/> Thank you, <br/> Daw Cho"
        }).catch(err => {
            console.log("sent email error: ", err)
        }).then(status => {
            console.log("sent email status: ", status)
        })
    }

    return (
        <View>
            <Text>This is excel table.</Text>
            <Table borderStyle={{ borderWidth: 2, borderColor: "red"}}>
                <Rows data={[storeID, storeName]} textStyle={styles.text}/>
                <TableWrapper style={styles.wrapper}>
                    <Rows data={body} textStyle={styles.text} flexArr={[1.5, 1, 1, 1]}/>
                </TableWrapper>
            </Table>
            <Button 
                title="Sent"
                onPress={onSent}   
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    wrapper: { flexDirection: "row"}
  });