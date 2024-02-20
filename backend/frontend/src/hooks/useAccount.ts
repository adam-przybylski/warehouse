import {useNavigate} from "react-router-dom";
import {useAccountState} from "../context/AccountContext.tsx";
import {AccountTypeEnum} from "../enums/AccountTypeEnum.enum.ts";
import {api} from "../api/api.ts";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {Pathnames} from "../router/pathnames.ts";
import {useAlert} from "./useAlert.ts";

interface CustomJwtPayload extends JwtPayload {
    role: string;
}

export const useAccount = () => {
    const navigate = useNavigate()
    const { showErrorAlert } = useAlert()
    const {
        account,
        setAccount,
        loggedAccount,
        setLoggedAccount,
        isLoggingIn,
        setIsLoggingIn,
        isFetching,
        setIsFetching
    } =
        useAccountState()

    const isAuthenticated = !!loggedAccount?.username
    const isAdmin = loggedAccount?.role === AccountTypeEnum.ADMIN
    const isUser = loggedAccount?.role === AccountTypeEnum.USER || isAdmin


    const logIn = async (login: string, password: string) => {
        try {
            setIsLoggingIn(true)
            const {data} = await api.logIn(login, password)
            const decoded = jwtDecode<CustomJwtPayload>(data)
            setLoggedAccount({username: decoded.sub, role: decoded.role as AccountTypeEnum, token: data})
        } catch (error) {
            showErrorAlert('Błąd logowania! Spróbuj ponownie.')
            console.error("Logging error" + JSON.stringify(error))
        } finally {
            setIsLoggingIn(false)
        }
    }

    const getCurrentAccount = async () => {
        try {
            setIsFetching(true)
            const token = localStorage.getItem('token')
            if (token) {
                const decoded = jwtDecode<CustomJwtPayload>(token)
                const {data} = await api.getAccount(decoded.sub)
                setLoggedAccount({username: decoded.sub, role: decoded.role as AccountTypeEnum, token: token})
                setAccount(data)
            }
        } catch (error) {
            logOut()
            showErrorAlert('Sesja wygasła! Zaloguj się ponownie.')
            console.error(JSON.stringify(error))
        } finally {
            setIsFetching(false)
        }
    }

    const logOut = () => {
        setIsFetching(true)
        localStorage.removeItem('token')
        setLoggedAccount(null)
        navigate(Pathnames.public.login)
        setIsFetching(false)
    }

    return {
        account,
        loggedAccount,
        isLoggingIn,
        isFetching,
        isAuthenticated,
        isAdmin,
        isUser,
        logIn,
        getCurrentAccount,
        logOut,
    }
}
