import {useNavigate} from "react-router-dom";
import {useAccountState} from "../context/AccountContext.tsx";
import {AccountTypeEnum} from "../enums/AccountTypeEnum.enum.ts";
import {api} from "../api/api.ts";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {Pathnames} from "../router/pathnames.ts";

interface CustomJwtPayload extends JwtPayload {
    role: string;
}

export const useAccount = () => {
    const navigate = useNavigate()
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
            alert('Błąd logowania! Spróbuj ponownie.' + JSON.stringify(error))
            console.error("Logging error" + error)
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
                const {data} = await api.getCurrentAccount(decoded.sub)
                setLoggedAccount({username: decoded.sub, role: decoded.role as AccountTypeEnum, token: token})
                setAccount(data)
            }
        } catch {
            alert('Błąd podczas pobierania danych użytkownika!')
            logOut()
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
