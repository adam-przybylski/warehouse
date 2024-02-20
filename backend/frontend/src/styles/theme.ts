import { createTheme } from '@mui/material'

export const colors = {
    primary: '#CC3A00',
    secondary: '#B88400',
    error: '#CC3A00',
    warning: '#B4CC00',
    info: '#00B8CC',
    success: '#28E247',
}

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

