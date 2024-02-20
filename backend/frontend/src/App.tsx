import './App.css'
import {BrowserRouter as Router} from 'react-router-dom'
import {RoutesComponent} from './router/Routes/index.tsx'
import {AccountStateContextProvider} from "./context/AccountContext.tsx";
import {AlertStateContextProvider} from "./context/AlertContext.tsx";
import {AccountsStateContextProvider} from "./context/AccountsContext.tsx";
import {Snackbar} from "@mui/material";
import {useAlert} from "./hooks/useAlert.ts";
import {AccountDetailsStateContextProvider} from "./context/AccountDetailsContext.tsx";

const AlertListener = () => {
    const { alert, hideAlert } = useAlert()

    return (
        <Snackbar open={!!alert} autoHideDuration={6000} onClose={hideAlert} message={alert?.message} />
    )
}

function App() {

    return (
        <Router>
            <AlertStateContextProvider>
                <AccountStateContextProvider>
                    <AccountsStateContextProvider>
                        <AccountDetailsStateContextProvider>
                            <AlertListener />
                            <RoutesComponent />
                        </AccountDetailsStateContextProvider>
                    </AccountsStateContextProvider>
                </AccountStateContextProvider>
            </AlertStateContextProvider>
        </Router>
    )
}

export default App
