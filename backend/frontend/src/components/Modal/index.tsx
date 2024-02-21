import {Button, Modal, Typography} from '@mui/material'
import {ReactElement, useEffect} from 'react'
import {ModalBody, ModalContent, ModalFooter, ModalHeader} from './styles'

export interface ModalProps {
    title?: string
    open: boolean
    diasbleButtons?: boolean
    handleConfirm: () => void
    handleClose: () => void
    children: ReactElement
}

export const ModalComponent = (
    {
        title,
        open,
        handleConfirm,
        handleClose,
        children,
    }: ModalProps) => {

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                handleConfirm();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <ModalContent>
                {title && (
                    <ModalHeader>
                        <Typography variant="h5">{title}</Typography>
                    </ModalHeader>
                )}
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    <Button variant="outlined" onClick={handleClose} color="error">
                        Zamknij
                    </Button>
                    <Button variant="contained" onClick={handleConfirm}>
                        Potwierdź
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
