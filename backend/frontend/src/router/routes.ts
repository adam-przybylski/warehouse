import {Pathnames} from "./pathnames.ts";
import {RouteType} from "../types/RouteType.ts";
import {AccountsPageComponent} from "../pages/admin/AccountsPage";
import {LoginPageComponent} from "../pages/public/LoginPage";
import {AvailabilityPageComponent} from "../pages/viewer/AvailabilityPage";
import {ReservationsPageComponent} from "../pages/user/ReservationsPage";
import {DeliveryPageComponent} from "../pages/user/DeliveryPage";
import {ClientsPageComponent} from "../pages/viewer/ClientsPage";
import {ReservationsHistoryPageComponent} from "../pages/viewer/ReservationsHistoryPage";

export const adminRoutes: RouteType[] = [
    {
        path: Pathnames.admin.accounts,
        name: 'Panel administratora',
        Component: AccountsPageComponent,
    }
]

export const userRoutes: RouteType[] = [
    {
        path: Pathnames.user.delivery,
        name: 'Dostawa',
        Component: DeliveryPageComponent,
    },
    {
        path: Pathnames.user.reservations,
        name: 'Zamówienia',
        Component: ReservationsPageComponent,
    },
]

export const viewerRoutes: RouteType[] = [
    {
        path: Pathnames.viewer.availability,
        name: 'Stan magazynowy',
        Component: AvailabilityPageComponent,
    },
    {
        path: Pathnames.viewer.clients,
        name: 'Klienci',
        Component: ClientsPageComponent,
    },
    {
        path: Pathnames.viewer.reservationsHistory,
        name: 'Historia zamówień',
        Component: ReservationsHistoryPageComponent,
    },

]

export const publicRoutes: RouteType[] = [
    {
        path: Pathnames.public.login,
        name: 'Strona logowania',
        Component: LoginPageComponent,
    },
]

