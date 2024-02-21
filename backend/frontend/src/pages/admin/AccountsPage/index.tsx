import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from '@mui/material'
import {useEffect, useState} from 'react'
import {LoaderComponent} from '../../../components/Loader'
import {useAccounts} from '../../../hooks/useAccounts'
import {CreateAccountModalComponent} from "../../../components/CreateAccountModal";
import {ChangePasswordModalComponent} from "../../../components/ChangePasswordModal";
import {AccountType} from "../../../types/AccountType.ts";
import {ButtonsContainer} from './styles'
import {useAccountDetails} from "../../../hooks/useAccountDetails.ts";


export const AccountsPageComponent = () => {

    const {accounts, isFetching, fetchAccounts} = useAccounts()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const [account, setAccount] = useState<AccountType | null>(null)
    const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] = useState(false)

    const {isUpdating, enableAccount, disableAccount} = useAccountDetails()

    useEffect(() => {
        if (!accounts) {
            fetchAccounts()
        }
    }, [])

    const openCreateModal = () => {
        setIsCreateModalOpen(true)
    }

    const closeCreateModal = () => {
        setIsCreateModalOpen(false)
        fetchAccounts()
    }

    const handleEnableDisableAccount = (username: string, enabled: undefined | boolean) => {
        if (enabled) {
            disableAccount(username).then(() => fetchAccounts())
        } else {
            enableAccount(username).then(() => fetchAccounts())
        }

    }

    const openUpdatePasswordModal = (account: AccountType) => {
        setAccount(account)
        setIsUpdatePasswordModalOpen(true)
    }

    const closeUpdatePasswordModal = () => {
        setAccount(null)
        setIsUpdatePasswordModalOpen(false)
    }


    const renderTable = () => {
        if (!accounts || accounts.length === 0) {
            return <div>Brak wyników</div>
        }

        return (
            <Table sx={{minWidth: 450}}>
                <TableHead sx={{background: '#605f5f'}}>
                    <TableRow>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.2rem'}}>Nazwa użytkownika</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.2rem', textAlign: 'center'}}>Rola</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.2rem', textAlign: 'center'}}>
                            Zablokowany
                        </TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.2rem'}}></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {accounts.map(({id, username, role, enabled}) => (
                        <TableRow
                            key={id}
                            hover
                        >
                            <TableCell component="th" scope="row" sx={{fontSize: '1.1rem'}}>
                                {username}
                            </TableCell>
                            <TableCell component="th" scope="row" sx={{fontSize: '1.1rem', textAlign: 'center'}}>
                                {role == 'ADMIN' ? 'Administrator' : ''}
                                {role == 'USER' ? 'Użytkownik' : ''}
                                {role == 'VIEWER' ? 'Przeglądający' : ''}
                            </TableCell>
                            <TableCell component="th" scope="row" sx={{fontSize: '1.1rem', textAlign: 'center'}}>
                                {enabled ? 'Nie' : 'Tak'}
                            </TableCell>
                            <TableCell component="th" scope="row" sx={{fontSize: '1.1rem'}}>
                                <ButtonsContainer>
                                    <Button sx={{padding: 0}} onClick={(e) => {
                                        e.stopPropagation()
                                        openUpdatePasswordModal({id, username, role, enabled})
                                    }}>
                                        Zmień hasło
                                    </Button>

                                    <Button sx={{padding: 0}} disabled={isUpdating} onClick={(e) => {
                                        e.stopPropagation()
                                        handleEnableDisableAccount(username, enabled)
                                    }}>
                                        {enabled ? 'Zablokuj' : 'Odblokuj'}
                                    </Button>

                                </ButtonsContainer>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    return (
        <div>
            <Button variant="contained" onClick={fetchAccounts} disabled={isFetching} sx={{my: 2, mr: 1}}>
                Odśwież
            </Button>
            <Button variant="contained" onClick={openCreateModal}>Dodaj konto</Button>

            <TableContainer component={Paper}>
                {isFetching ? <LoaderComponent small/> : renderTable()}
            </TableContainer>

            <ChangePasswordModalComponent
                account={account}
                open={isUpdatePasswordModalOpen}
                handleClose={closeUpdatePasswordModal}
            />

            <CreateAccountModalComponent open={isCreateModalOpen} handleClose={closeCreateModal}/>
        </div>
    )
}

