import { AccountType } from '../../types/AccountType.ts'
import { ModalComponent, ModalProps } from '../Modal'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormContainer } from './styles.ts'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { LoaderComponent } from '../Loader'
import { AccountTypeEnum } from '../../enums/AccountTypeEnum.enum.ts'
import { useState } from 'react'
import { useAccounts } from '../../hooks/useAccounts'

type CreateAccountModalProps = Omit<ModalProps, 'children' | 'handleConfirm'>

const schema = yup.object({
    username: yup.string().required('Nazwa użytkownika jest wymagana').min(2, 'Nazwa użytkownika musi mieć co najmniej 6 znaków'),
    password: yup.string().required('Hasło jest wymagane').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Hasło musi zawierać przynajmniej jedną małą literę, jedną dużą literę, jedną cyfrę, jeden znak specjalny i łącznie mieć przynajmniej 8 znaków.'
    )
})

type LoginFormType = yup.InferType<typeof schema>

export const CreateAccountModalComponent = ({ open, handleClose }: CreateAccountModalProps) => {
    const { isCreating, createAccount } = useAccounts()
    const [selectedAccountType, setSelectedAccountType] = useState<AccountTypeEnum>(
        AccountTypeEnum.USER,
    )

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormType>({
        resolver: yupResolver(schema),
    })

    const onSubmit = handleSubmit(
        async ({username, password }) => {
            const account: AccountType = {
                username,
                password,
                role: selectedAccountType,
            }
            await createAccount(account)
            reset()
            handleClose()
        },
    )

    return (
        <ModalComponent
            title="Utwórz nowe konto"
            open={open}
            handleClose={handleClose}
            handleConfirm={onSubmit}
            diasbleButtons={isCreating}
        >
            {isCreating ? (
                <LoaderComponent small />
            ) : (
                <FormContainer>
                    <form onSubmit={onSubmit}>
                        <TextField
                            {...register('username')}
                            margin="normal"
                            fullWidth
                            name="username"
                            label="Nazwa użytkownika"
                            id="username"
                        />
                        <FormHelperText id="username" error>
                            {errors?.username?.message}
                        </FormHelperText>

                        <TextField
                            {...register('password')}
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Hasło"
                            id="password"
                            type="password"
                        />
                        <FormHelperText id="password" error>
                            {errors?.password?.message}
                        </FormHelperText>

                        <FormControl fullWidth>
                            <InputLabel id="account-type-label">Typ konta</InputLabel>
                            <Select
                                labelId="account-type-label"
                                id="account-type"
                                value={selectedAccountType}
                                label="Account Type"
                                onChange={(e) => setSelectedAccountType(e.target.value as AccountTypeEnum)}
                            >
                                <MenuItem value={AccountTypeEnum.VIEWER}>Przeglądający</MenuItem>
                                <MenuItem value={AccountTypeEnum.USER}>Użytkownik</MenuItem>
                                <MenuItem value={AccountTypeEnum.ADMIN}>Administrator</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </FormContainer>
            )}
        </ModalComponent>
    )
}
