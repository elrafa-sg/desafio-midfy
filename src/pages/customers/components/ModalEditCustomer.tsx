import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box'

interface ModalEditCustomerProps {
    open: boolean,
    cancelFunction: Function,
    confirmFunction: Function
}

const ModalEditCustomer = (props: ModalEditCustomerProps) => {
    const { open, cancelFunction, confirmFunction } = props

    return(
        <Modal open={open}>
            <Box>

            </Box>
        </Modal>
    )
}

export { ModalEditCustomer }