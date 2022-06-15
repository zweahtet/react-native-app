import { DAYS, DAY_IN_SECOND } from "../constants/dayDateConst";
import XLSX from "xlsx";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const makeDateArray = (initial) => {
    return Array.from(Array(7).keys(), (index) => new Date(initial.valueOf() + index*DAY_IN_SECOND*1000))
}

// This returns a local uri that can be shared
export const generateShareableExcel = async (name, data) => {
    const now = new Date();
    const fileName = `${name}.xlsx`;
    console.log("Filename: ", fileName, "length: ", fileName.length)
    const fileUri = FileSystem.documentDirectory + fileName;
    const heading = [["DAY", "MONTH", "DATE", "DAILY SALES"]]
    
    const modifiedData = Array.from(data, item => {
        return {
            day: new Intl.DateTimeFormat('en-US', {
                weekday: "long"
            }).format(item.saleDate),
            month: item.saleDate.getMonth(),
            date: item.saleDate.getDate(),
            sale: item.saleAmount
        }
    })
    
    return new Promise((resolve, reject) => {
        const workbook = XLSX.utils.book_new();
        workbook.creator = 'Me';
        workbook.created = now;
        workbook.modified = now;
        // Add a sheet to work on
        // Initial Row
        const worksheet = XLSX.utils.aoa_to_sheet([
            ["Your ID - CC763"], ["Store Name/Number - MOL#9"]
        ])
        
        // Write data starting at A3
        XLSX.utils.sheet_add_aoa(worksheet, heading, {origin: "A3"})
        XLSX.utils.sheet_add_json(worksheet, modifiedData, {
            origin: "A4", skipHeader: true, header: ["day", "month", "date", "sale" ]
        })
        XLSX.utils.sheet_add_aoa(worksheet, [["TOTAL"]], {
            origin: "C11", skipHeader: true
        })
        
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
        const wbout = XLSX.write(workbook, {
            type:"base64", 
            bookType:"xlsx"
        })
        FileSystem.writeAsStringAsync(fileUri, wbout, {
            encoding: FileSystem.EncodingType.Base64
        }).catch((err) => {
            console.log("write error: ", err)
            reject(err)
        }).then(() => {
            resolve(fileUri);
        })
    });
}

export const shareExcel = async (uri) => {
    Sharing.shareAsync(uri, {
        UTI: "com.microsoft.excel.xlsx"
    }).catch(err => {
        console.log("share error: ", err)
    }).then(() => {
        console.log("Return from sharing dialog.")
    })
}

export const readExcel = async (fileURI, sheetName) => {
    return new Promise((resolve, reject) => {
        FileSystem.readAsStringAsync(fileURI, {
            encoding: FileSystem.EncodingType.Base64
        })
        .catch(err => {
            console.log("read file error: ", err)
            reject(err)
        })
        .then(res => {
            // Read and parse local data 
            const workbook = XLSX.read(res, {
                type: "base64"
            })

            const worksheet = workbook.Sheets[sheetName]
            
            const data = XLSX.utils.sheet_to_json(worksheet, {
                header: 1
            })
            // console.log("data: ", data)
            resolve(data)
        })
    })
}

const getDay = (dateNum) => {
    switch(dateNum) {
        case DAYS.Monday:
            return "Monday"
            break
        case DAYS.Tuesday:
            return "Tuesday"
            break
        case DAYS.Wednesday: 
            return "Wednesday"
            break
        case DAYS.Thursday:
            return "Thursday"
            break
        case DAYS.Friday: 
            return "Friday"
            break
        case DAYS.Saturday:
            return "Saturday"
            break
        case DAYS.Sunday: 
            return "Sunday"
            break
        default:
            return "Invalid Day"
    }
}