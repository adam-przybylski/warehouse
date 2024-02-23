import {ModalComponent, ModalProps} from "../Modal";



export const ConfirmModalComponent = ({open, handleConfirm, handleClose, title, children}: ModalProps) => {

    const closeAfterConfirm = () => {
        handleConfirm()
        handleClose()

    }

    return (
        <ModalComponent
            open={open}
            handleConfirm={closeAfterConfirm}
            handleClose={handleClose}
            title={title}
            children={children}
        >
        </ModalComponent>
    )
}