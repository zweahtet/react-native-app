import React from "react"
import { AppRegistry } from "react-native"
import { ThemeProvider } from "@rneui/themed"
import { theme } from "src/constants/theme.js"
import App from "./App"

function Main() {
    return (
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    )
}

AppRegistry.registerComponent('main', () => Main);