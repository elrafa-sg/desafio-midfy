import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
interface ModalDeleteCustomerProps {
    open: boolean,
    cancelFunction: Function,
    confirmFunction: Function
}

const ModalDeleteCustomer = (props: ModalDeleteCustomerProps) => {
    const { open, cancelFunction, confirmFunction } = props

    return (
        <Modal open={open} onClose={() => cancelFunction()}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw"}}
        >
            <Box component={Paper} 
                sx={{ 
                    borderRadius: '20px', padding: '20px', maxWidth: "400px",
                    display: "flex", justifyContent: "center", flexDirection: "column", gap: "10px"
                }}
            >
                <Typography sx={{fontWeight: 'bold'}}>Deseja mesmo deletar este cliente?</Typography>

                <Box sx={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}
                >
                    <Button variant="contained" color="error" onClick={() => cancelFunction()}>Cancelar</Button>
                    <Button variant="contained" color="success" onClick={() => confirmFunction()}>Confirmar</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export { ModalDeleteCustomer }