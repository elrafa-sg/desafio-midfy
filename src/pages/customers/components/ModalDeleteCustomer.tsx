import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box'

interface ModalDeleteCustomerProps {
    open: boolean,
    cancelFunction: Function,
    confirmFunction: Function
}

const ModalDeleteCustomer = (props: ModalDeleteCustomerProps) => {
    const { open, cancelFunction, confirmFunction } = props

    return(
        <Modal open={open}>
            <Box>

            </Box>
        </Modal>
    )
}

export { ModalDeleteCustomer }