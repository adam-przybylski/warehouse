import * as yup from 'yup'
import {useAccount} from "../../../hooks/useAccount.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {Pathnames} from "../../../router/pathnames.ts";
import {Navigate} from "react-router-dom";
import {FormContainer} from "./styles.ts";
import {Avatar, Button, FormHelperText, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {LockOutlined, Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";

const schema = yup.object({
    login: yup.string().required('Login is required').min(6, 'Must be at least 6 characters').max(20, 'Must be at most 20 characters'),
    password: yup.string().required('Password is required'),
})

type LoginFormType = yup.InferType<typeof schema>

export const LoginPageComponent = () => {
    const {isAuthenticated, logIn} = useAccount()
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormType>({
        resolver: yupResolver(schema),
    })

    const onSubmit = handleSubmit(({ login, password }) => {
        logIn(login, password)
    })

    if (isAuthenticated) {
        return <Navigate to={Pathnames.viewer.home} replace />
    }

    return (
        <FormContainer>
            <Avatar>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Zaloguj się
            </Typography>
            <form onSubmit={onSubmit}>
                <TextField
                    {...register('login')}
                    margin="normal"
                    fullWidth
                    id="login"
                    label="Login"
                    name="login"
                    autoComplete="login"
                    autoFocus
                />
                <FormHelperText id="login" error>
                    {errors?.login?.message}
                </FormHelperText>
                <TextField
                    {...register('password')}
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    InputProps={{ // <-- This is where the toggle button is added.
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <FormHelperText id="password" error>
                    {errors?.password?.message}
                </FormHelperText>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign In
                </Button>
            </form>
        </FormContainer>
    )


}
