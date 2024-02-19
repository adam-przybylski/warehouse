import {AppBar, Box, Button, Container, Toolbar, Typography} from '@mui/material'
import { ReactNode } from 'react'
import { Pathnames } from '../../../router/pathnames'
import { useNavigate } from 'react-router-dom'
import { useAccount } from '../../../hooks/useAccount'

interface UserLayoutProps {
    children: ReactNode
    name: string
}

export const UserLayout = ({ children, name }: UserLayoutProps) => {
    const navigate = useNavigate()
    const { isAdmin } = useAccount()
    const { logOut } = useAccount()

    return (
        <div>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h4" sx={{ mx: 2 }}>
                        {name}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {isAdmin && (
                            <Button
                                onClick={() => navigate(Pathnames.admin.accounts)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Panel administratora
                            </Button>
                        )}
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
