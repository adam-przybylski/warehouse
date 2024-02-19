import {Pathnames} from "./pathnames.ts";
import {RouteType} from "../types/RouteType.ts";
import {AccountsPageComponent} from "../pages/admin/AccountsPage";
import {AccountDetailsPageComponent} from "../pages/admin/AccountDetailsPage";
import {HomePageComponent} from "../pages/viewer/HomePage";
import {LoginPageComponent} from "../pages/public/LoginPage";

export const adminRoutes: RouteType[] = [
    {
        path: Pathnames.admin.accounts,
        Component: AccountsPageComponent,
    },
    {
        path: Pathnames.admin.accountDetails,
        Component: AccountDetailsPageComponent,
    }
]

export const userRoutes: RouteType[] = [
    {
        path: Pathnames.user.home,
        Component: HomePageComponent,
    },
]

export const viewerRoutes: RouteType[] = [
    {
        path: Pathnames.user.home,
        Component: HomePageComponent,
    },
]

export const publicRoutes: RouteType[] = [
    {
        path: Pathnames.public.login,
        Component: LoginPageComponent,
    },
]

