import {ModalComponent, ModalProps} from "../Modal";
import * as yup from 'yup'
import {useClients} from "../../hooks/useClients.ts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ClientType} from "../../types/ClientType.ts";
import {LoaderComponent} from "../Loader";
import {FormContainer} from "./styles.ts";
import {FormHelperText, TextField} from "@mui/material";

type AddClientModalProps = Omit<ModalProps, 'children' | 'handleConfirm'>

const schema = yup.object({
    name: yup
        .string()
        .required('Nazwa klienta jest wymagana')
        .min(1, 'Nazwa klienta musi mieć co najmniej 1 znak')
        .max(250, 'Nazwa klienta nie może mieć więcej niż 250 znaków'),
    city: yup
        .string()
        .required('Miasto jest wymagane')
        .min(1, 'Miasto musi mieć co najmniej 1 znak')
        .max(250, 'Miasto nie może mieć więcej niż 250 znaków')
})

type ClientFormType = yup.InferType<typeof schema>

export const AddClientModalComponent = ({ open, handleClose }: AddClientModalProps) => {
    const { isCreating, createClient } = useClients()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ClientFormType>({
        resolver: yupResolver(schema),
    })

    const onSubmit = handleSubmit(
        async ({ name, city }) => {
            const client: ClientType = {
                name,
                city,
            }
            await createClient(client)
            reset()
            handleClose()
        },
    )

    return (
        <ModalComponent
            title="Dodaj nowego klienta"
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
                            {...register('name')}
                            margin="normal"
                            fullWidth
                            name="name"
                            label="Nazwa"
                            id="name"
                            type="text"
                        />
                        <FormHelperText id="name" error>
                            {errors.name?.message}
                        </FormHelperText>

                        <TextField
                            {...register('city')}
                            margin="normal"
                            fullWidth
                            name="city"
                            label="Miasto"
                            id="city"
                            type="text"
                        />
                        <FormHelperText id="city" error>
                            {errors.city?.message}
                        </FormHelperText>
                    </form>
                </FormContainer>
            )}
        </ModalComponent>
    )
}


