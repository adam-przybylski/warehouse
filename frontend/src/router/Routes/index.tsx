import {Navigate, Route, Routes} from 'react-router-dom'
import {adminRoutes, publicRoutes, userRoutes, viewerRoutes} from "../routes.ts";
import {Pathnames} from "../pathnames.ts";
import {useAccount} from "../../hooks/useAccount.ts";
import {useEffect} from "react";
import {PublicLayout} from "../../components/layouts/PublicLayout";
import {ThemeProvider} from "@mui/material";
import {authenticatedTheme} from "../../styles/theme.ts";
import {AuthenticatedLayout} from "../../components/layouts/AuthenticatedLayout";
import {LoaderComponent} from "../../components/Loader";

export const RoutesComponent = () => {

    const {account, isAuthenticated, isAdmin, isUser, isFetching, getCurrentAccount} = useAccount()

    useEffect(() => {
        if (!account) {
            getCurrentAccount()
        }
    }, [])
    if (isFetching) {
        return <LoaderComponent />
    }


    return (
        <Routes>
            {publicRoutes.map(({path, Component}) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <PublicLayout>
                            <Component/>
                        </PublicLayout>
                    }/>
            ))}

            {isAuthenticated &&
                viewerRoutes.map(({path, Component, name}) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <ThemeProvider theme={authenticatedTheme}>
                                <AuthenticatedLayout name={name}>
                                    <Component/>
                                </AuthenticatedLayout>
                            </ThemeProvider>
                        }
                    />
                ))}


            {isAuthenticated && isUser &&
                userRoutes.map(({path, Component, name}) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <ThemeProvider theme={authenticatedTheme}>
                                <AuthenticatedLayout name={name}>
                                    <Component/>
                                </AuthenticatedLayout>
                            </ThemeProvider>
                        }
                    />
                ))}

            {isAuthenticated && isUser && isAdmin &&
                adminRoutes.map(({path, Component, name}) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <ThemeProvider theme={authenticatedTheme}>
                                <AuthenticatedLayout name={name}>
                                    <Component/>
                                </AuthenticatedLayout>
                            </ThemeProvider>
                        }
                    />
                ))}

            <Route path="*" element={<Navigate to={Pathnames.public.login} replace/>}/>

        </Routes>
    )

}




