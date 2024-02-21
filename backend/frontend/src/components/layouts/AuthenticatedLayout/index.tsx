import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@mui/material'
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
                <Toolbar sx={{display: 'flex', p: 0}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{mx: 0}}
                        onClick={handleClickShowBox}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h5" sx={{mx: 0, color: 'white'}}>
                        {name}
                    </Typography>
                    <Button onClick={logOut} sx={{
                        mx: 1, color: 'white', marginLeft: 'auto',
                        '&:hover': {
                            backgroundColor: '#277ec9',
                        },
                    }}>
                        Wyloguj się
                    </Button>
                </Toolbar>
                {showBox &&
                    <Toolbar sx={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Button
                            onClick={() => {
                                setShowBox(false)
                                navigate(Pathnames.viewer.clients)
                            }}
                            sx={{
                                my: 1, color: 'white',
                                '&:hover': {
                                    backgroundColor: '#277ec9',
                                },
                            }}
                        >
                            Klienci
                        </Button>

                        <Button
                            onClick={() => {
                                setShowBox(false)
                                navigate(Pathnames.viewer.availability)
                            }}
                            sx={{
                                my: 1, color: 'white',
                                '&:hover': {
                                    backgroundColor: '#277ec9',
                                },
                            }}
                        >
                            Stan magazynowy
                        </Button>
                        <Button
                            onClick={() => {
                                setShowBox(false)
                                navigate(Pathnames.viewer.reservations)
                            }}
                            sx={{
                                my: 1, color: 'white', '&:hover': {
                                    backgroundColor: '#277ec9',
                                },
                            }}
                        >
                            Rezerwacje
                        </Button>
                        {isUser && (
                            <Button
                                onClick={() => {
                                    setShowBox(false)
                                    navigate(Pathnames.user.delivery)
                                }}
                                sx={{
                                    my: 1, color: 'white', '&:hover': {
                                        backgroundColor: '#277ec9',
                                    },
                                }}
                            >
                                Dostawa
                            </Button>
                        )}
                        {isAdmin && (
                            <Button
                                onClick={() => {
                                    setShowBox(false)
                                    navigate(Pathnames.admin.accounts)
                                }}
                                sx={{
                                    my: 1, color: 'white', '&:hover': {
                                        backgroundColor: '#277ec9',
                                    },
                                }}
                            >
                                Panel administratora
                            </Button>
                        )}

                    </Toolbar>
                }
            </AppBar>

            <Container sx={{p: 2}}>{children}</Container>
        </div>
    )
}
