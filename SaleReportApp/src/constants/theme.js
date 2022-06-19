import { Platform } from "react-native"
import { createTheme } from "@rneui/themed"

const lightColors = {
    ...Platform.select({
        default: lightColors.platform.android,
        ios: lightColors.platform.ios,
    }),
}

const COLORS = {
    purple: "#5e03fc",
    red: "#fc0373",
    green: "#1ff2e8",
    blue: "#0274f5",
    white: '#F0F2F3',
    primary: "#2e7d32",
    secondary: "#757575"
}

const SIZES = {
    // global
    base: 8,
    font: 16,
    radius: 12,

    // fontSizes

}

const FONTS = {

}

const SPACING = {
    s: 8,
    m: 16,
    l: 24,
    xl: 40
}


const theme = createTheme({
    // colors: {
    //     background: COLORS.white,
    //     primary: COLORS.purple,
    //     success: COLORS.green,
    //     danger: COLORS.red,
    //     failure: COLORS.red
    // },
    // spacing: SPACING
    lightColors: lightColors
})

export default theme