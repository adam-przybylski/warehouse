import {Navigate, Route, Routes} from 'react-router-dom'
import {adminRoutes, publicRoutes, userRoutes, viewerRoutes} from "../routes.ts";
import {Pathnames} from "../pathnames.ts";
import {useAccount} from "../../hooks/useAccount.ts";
import {useEffect} from "react";
import {PublicLayout} from "../../components/layouts/PublicLayout";

export const RoutesComponent = () => {

    const {account, isAuthenticated, isAdmin, isUser, isFetching, getCurrentAccount} = useAccount()

    useEffect(() => {
        if (!account) {
            getCurrentAccount()
        }
    }, [])
    if (isFetching) {
        return <div>Loading</div>
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
                viewerRoutes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component/>}/>
                ))}


            {isAuthenticated && isUser &&
                userRoutes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component/>}/>
                ))}

            {isAuthenticated && isUser && isAdmin &&
                adminRoutes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component/>}/>
                ))}

            <Route path="*" element={<Navigate to={Pathnames.public.login} replace/>}/>

        </Routes>
    )

}




