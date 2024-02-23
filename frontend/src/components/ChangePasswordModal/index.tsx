import {AccountType} from "../../types/AccountType.ts";
import {ModalComponent, ModalProps} from "../Modal";
import * as yup from "yup";
import {useAccountDetails} from "../../hooks/useAccountDetails.ts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoaderComponent} from "../Loader";
import {FormContainer} from "./styles.ts";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";

interface ChangePasswordModalProps extends Omit<ModalProps, 'children' | 'handleConfirm'> {
    account: AccountType | null
}

const schema = yup.object({
    password: yup.string().required('Hasło jest wymagane').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Hasło musi zawierać przynajmniej jedną małą literę, jedną dużą literę, jedną cyfrę, jeden znak specjalny i łącznie mieć przynajmniej 8 znaków.'
    )
})

type UpdatePasswordFormType = yup.InferType<typeof schema>

export const ChangePasswordModalComponent = ({open, handleClose, account}: ChangePasswordModalProps) => {
    const {isUpdating, updatePassword} = useAccountDetails()

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<UpdatePasswordFormType>({
        resolver: yupResolver(schema),
    })

    const onSubmit = handleSubmit(
        async ({password}) => {
            await updatePassword(account?.username, password)
            reset()
            handleClose()
        },
    )

    return (
        <ModalComponent
            title="Zmień hasło"
            open={open}
            handleClose={handleClose}
            handleConfirm={onSubmit}
            diasbleButtons={isUpdating}
        >
            {isUpdating ? (
                <LoaderComponent small/>
            ) : (
                <FormContainer>
                    Konto: {account?.username}
                    <form onSubmit={onSubmit}>
                        <TextField
                            {...register('password')}
                            label="Hasło"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{ // <-- This is where the toggle button is added.
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </form>
                </FormContainer>
            )}
        </ModalComponent>
    )
}