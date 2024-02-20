import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from '@mui/material'
import {useEffect} from 'react'
import {LoaderComponent} from '../../../components/Loader'
import {useAccounts} from '../../../hooks/useAccounts'


export const AccountsPageComponent = () => {

    const {accounts, isFetching, fetchAccounts} = useAccounts()

    useEffect(() => {
        if (!accounts) {
            fetchAccounts()
        }
    }, [])

    const renderTable = () => {
        if (!accounts || accounts.length === 0) {
            return <div>No results</div>
        }

        return (
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nazwa użytkownika</TableCell>
                        <TableCell>Rola</TableCell>
                        <TableCell>Zablokowany</TableCell>

                    </TableRow>
                </TableHead>

                <TableBody>
                    {accounts.map(({id, username, role, enabled}) => (
                        <TableRow
                            key={id}
                            hover
                            // onClick={() => navigate(Pathnames.admin.accountDetails.replace(':login', login))}
                            sx={{cursor: 'pointer'}}
                        >
                            <TableCell component="th" scope="row">
                                {username}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {role == 'ADMIN' ? 'Administrator':''}
                                {role == 'USER' ? 'Użytkownik':''}
                                {role == 'VIEWER' ? 'Przeglądający':''}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {enabled ? 'Nie' : 'Tak'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    return (
        <div>
            <Button onClick={fetchAccounts} disabled={isFetching} sx={{my: 2}}>
                Odśwież
            </Button>

            <TableContainer component={Paper}>
                {isFetching ? <LoaderComponent small/> : renderTable()}
            </TableContainer>
        </div>
    )
}

