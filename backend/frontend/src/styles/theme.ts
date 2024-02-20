import { createTheme } from '@mui/material'

export const authenticatedTheme = createTheme({
    palette: {
        primary: {
            main: '#006dcc'
        },
        secondary: {
            main: '#B88400',
        },
        error: {
            main: '#CC3A00',
        },
        warning: {
            main: '#B4CC00',
        },
        info: {
            main: '#00B8CC',
        },
        success: {
            main: '#28E247',
        },
    },
})

export const userTheme = createTheme({})

export const viewerTheme = createTheme({})
