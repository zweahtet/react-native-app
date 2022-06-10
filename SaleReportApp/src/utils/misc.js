import { DAY_IN_SECOND } from "../constants/dayDateConst";
import XLSX from "xlsx";
import * as RNFS from "react-native-fs"
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const makeDateArray = (initial) => {
    return Array.from(Array(7).keys(), (index) => new Date(initial.valueOf() + index*DAY_IN_SECOND*1000))
}

// This returns a local uri that can be shared
export const generateShareableExcel = async (name, data) => {
    const now = new Date();
    const fileName = `${name}.xlsx`;
    const fileUri = FileSystem.documentDirectory + fileName;
    return new Promise<string>((resolve, reject) => {
        const workbook = XLSX.utils.book_new();
        workbook.creator = 'Me';
        workbook.created = now;
        workbook.modified = now;
        // Add a sheet to work on
        const worksheet = XLSX.utils.json_to_sheet(data)
        // // Just some columns as used on ExcelJS Readme
        // worksheet.columns = [
        //     { header: 'Id', key: 'id', width: 10 },
        //     { header: 'Name', key: 'name', width: 32 },
        //     { header: 'D.O.B.', key: 'dob', width: 10, }
        // ];
        // // Add some test data
        // worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
        // worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1969, 2, 3) });
        // Create a workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, name)

        // Write to file
        // workbook.xlsx.writeBuffer().then((buffer) => {
        //     // Do this to use base64 encoding
        //     const nodeBuffer = NodeBuffer.from(buffer);
        //     const bufferStr = nodeBuffer.toString('base64');
        //     FileSystem.writeAsStringAsync(fileUri, bufferStr, {
        //     encoding: FileSystem.EncodingType.Base64
        //     }).then(() => {
        //         resolve(fileUri);
        //     }).catch((err) => {
        //         console.log("write error: ", err)
        //     });
        // });
        const wbout = XLSX.write(workbook, {type:"base64", bookType:"xlsx"})
        FileSystem.writeAsStringAsync(fileUri, wbout, {
            encoding: FileSystem.EncodingType.Base64
        }).then(() => {
            resolve(fileUri);
        }).catch((err) => {
            console.log("write error: ", err)
        })
    });
}

const shareExcel = async (uri) => {
    Sharing.shareAsync(uri, {
        UTI: "com.microsoft.excel.xlsx"
    }).catch(err => {
        console.log("share error: ", err)
    }).then(() => {
        console.log("Return from sharing dialog.")
    })
}