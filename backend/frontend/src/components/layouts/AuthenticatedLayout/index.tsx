import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import {ReactNode, useState} from 'react'
import {Pathnames} from '../../../router/pathnames'
import {useNavigate} from 'react-router-dom'
import {useAccount} from '../../../hooks/useAccount'

interface AuthenticatedLayoutProps {
    children: ReactNode
    name: string
}

export const AuthenticatedLayout = ({children, name}: AuthenticatedLayoutProps) => {
    const navigate = useNavigate()
    const {isUser, isAdmin} = useAccount()
    const {logOut} = useAccount()

    const [showBox, setShowBox] = useState(false);

    const handleClickShowBox = () => setShowBox(!showBox);

    return (
        <div>
            <AppBar position="static">
                <Toolbar sx={{display: 'flex'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mx: 1}}
                        onClick={handleClickShowBox}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h5" sx={{mx: 1, color: 'white'}}>
                        {name}
                    </Typography>
                </Toolbar>
                {showBox &&
                    <Toolbar sx={{flexDirection: 'column'}}>

                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Button
                                onClick={() => navigate(Pathnames.viewer.home)}
                                sx={{my: 1, color: 'white', display: 'block'}}
                            >
                                Strona główna
                            </Button>
                            <Button
                                onClick={() => navigate(Pathnames.viewer.availability)}
                                sx={{my: 1, color: 'white', display: 'block'}}
                            >
                                Stan magazynowy
                            </Button>
                            <Button
                                onClick={() => navigate(Pathnames.viewer.reservations)}
                                sx={{my: 1, color: 'white', display: 'block'}}
                            >
                                Rezerwacje
                            </Button>
                            {isUser && (
                                <Button
                                    onClick={() => navigate(Pathnames.user.delivery)}
                                    sx={{my: 1, color: 'white', display: 'block'}}
                                >
                                    Dostawa
                                </Button>
                            )}
                            {isAdmin && (
                                <Button
                                    onClick={() => navigate(Pathnames.admin.accounts)}
                                    sx={{my: 1, color: 'white', display: 'block'}}
                                >
                                    Panel administratora
                                </Button>
                            )}
                            <Button onClick={logOut} sx={{my: 2, color: 'white'}}>
                                Wyloguj się
                            </Button>
                        </Box>

                    </Toolbar>
                }
            </AppBar>

            <Container sx={{p: 2}}>{children}</Container>
        </div>
    )
}
