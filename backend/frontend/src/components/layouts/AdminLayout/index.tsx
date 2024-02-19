import {AppBar, Box, Button, Container, Toolbar, Typography} from '@mui/material'
import { ReactNode } from 'react'
import { Pathnames } from '../../../router/pathnames'
import { useLocation, useNavigate } from 'react-router-dom'
import {useAccount} from "../../../hooks/useAccount.ts";

interface UserLayoutProps {
    children: ReactNode
    name: string
}

export const AdminLayout = ({ children, name }: UserLayoutProps) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { logOut } = useAccount()

    const getPageName = () => {
        if (pathname.includes(Pathnames.admin.accounts)) {
            return 'Accounts'
        }

        return 'Account Details'
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h4" sx={{ mx: 2 }}>
                        {name}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={() => navigate(Pathnames.user.home)} sx={{ my: 2, color: 'white' }}>
                            Strona główna
                        </Button>
                        <Button onClick={logOut} sx={{ my: 2, color: 'white' }}>
                            Wyloguj się
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container sx={{ p: 2 }}>{children}</Container>
        </div>
    )
}
