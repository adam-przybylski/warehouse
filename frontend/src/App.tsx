import {BrowserRouter as Router} from 'react-router-dom'
import {RoutesComponent} from './router/Routes/index.tsx'
import {AccountStateContextProvider} from "./context/AccountContext.tsx";
import {AlertStateContextProvider} from "./context/AlertContext.tsx";
import {AccountsStateContextProvider} from "./context/AccountsContext.tsx";
import {Snackbar, SnackbarContent} from "@mui/material";
import {useAlert} from "./hooks/useAlert.ts";
import {AccountDetailsStateContextProvider} from "./context/AccountDetailsContext.tsx";
import {ClientsStateContextProvider} from "./context/ClientsContext.tsx";
import {colors} from "./styles/theme.ts";
import {ProductsStateContextProvider} from "./context/ProductsContext.tsx";
import {useEffect} from "react";
import {ReservationStateContextProvider} from "./context/ReservationContext.tsx";

const AlertListener = () => {
    const {alert, hideAlert} = useAlert()

    return (
        <Snackbar open={!!alert} autoHideDuration={6000} onClose={hideAlert}>
            <SnackbarContent
                message={alert?.message}
                style={{backgroundColor: alert?.variant === 'error' ? colors.error : colors.success, fontSize: "1.2rem"}}
            />
        </Snackbar>
    )
}

function App() {

    useEffect(() => {
        document.title = "Hurtownia"
    }, [])

    return (
        <>
            {/*<GlobalStyles*/}
            {/*    styles={{*/}
            {/*        body: {backgroundColor: "#2a2929", color: "#fff"},*/}
            {/*    }}/>*/}
            <Router>
                <AlertStateContextProvider>
                    <AccountStateContextProvider>
                        <AccountsStateContextProvider>
                            <AccountDetailsStateContextProvider>
                                <ClientsStateContextProvider>
                                    <ProductsStateContextProvider>
                                        <ReservationStateContextProvider>
                                            <AlertListener/>
                                            <RoutesComponent/>
                                        </ReservationStateContextProvider>
                                    </ProductsStateContextProvider>
                                </ClientsStateContextProvider>
                            </AccountDetailsStateContextProvider>
                        </AccountsStateContextProvider>
                    </AccountStateContextProvider>
                </AlertStateContextProvider>
            </Router>
        </>
    )
}

export default App
