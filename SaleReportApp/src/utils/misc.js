import { DAY_IN_SECOND } from "../constants/dayDateConst";
import XLSX from "xlsx-js-style";
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
    const headers = ["DAY", "MONTH", "DATE", "DAILY SALES"]
    
    const modifiedData = Array.from(data, item => {
        return {
            day: new Intl.DateTimeFormat('en-US', {
                weekday: "long"
            }).format(item.saleDate),
            month: item.saleDate.getMonth() + 1,
            date: item.saleDate.getDate(),
            saleAmount: item.saleAmount
        }
    })
    
    const total = sumSales(modifiedData)
    
    return new Promise((resolve, reject) => {
        const workbook = XLSX.utils.book_new();
        workbook.creator = 'Me';
        workbook.created = now;
        workbook.modified = now;
        // Add a sheet to work on
        // Initial Row
        const worksheet = XLSX.utils.aoa_to_sheet([["Your ID - CC763"], ["Store Name/Number - MOL#9"]]);
        
        // // Write data starting at A3
        XLSX.utils.sheet_add_aoa(worksheet, [headers], {origin: "A3"})
        XLSX.utils.sheet_add_json(worksheet, modifiedData, {
            origin: "A4", skipHeader: true, header: ["day", "month", "date", "saleAmount" ]
        })
        XLSX.utils.sheet_add_aoa(worksheet, [["","","TOTAL", total.toString()]], {
            origin: "A11", skipHeader: true
        })

        // calculate column witdh 
        const max_width = modifiedData.reduce((w, data) => Math.max(w, 
            data.day.length), 10)
        worksheet["!cols"] = [ {wch: max_width}]

        // style the worksheet
        for (let cell_address in worksheet) {
            // if (typeof(worksheet[i]) != "object") continue;
            let cell = XLSX.utils.decode_cell(cell_address)
            
            if (cell.r >= 3) {
                worksheet[cell_address].s = {
                    alignment: {
                        horizontal: "right"
                    }
                }
            }
            if (cell.c == 0) {
                worksheet[cell_address].s = {
                    alignment: {
                        horizontal: "left"
                    }
                }
            }
        }

        // Create a workbook
        // const worksheet = XLSX.utils.aoa_to_sheet([row])
        XLSX.utils.book_append_sheet(workbook, worksheet, name)

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

export const sumSales = (salesFields) => {
    const sales = salesFields.map(field => {
        const saleAmount = parseInt(field.saleAmount)
        if (isNaN(saleAmount)) {
            return 0
        } 
        return saleAmount
    })
    
    const total = sales.reduce((accumulator, value) => {
        return accumulator + value
    }, 0)

    return total
}