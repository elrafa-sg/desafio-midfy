import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box'
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField"
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useEffect } from "react";
import Customer from "../../../models/Customer";

interface ModalEditCustomerProps {
    open: boolean,
    cancelFunction: Function,
    confirmFunction: Function,
    customer: Customer
}

const ModalEditCustomer = (props: ModalEditCustomerProps) => {
    const { open, cancelFunction, confirmFunction, customer } = props

    const customerSchema = yup.object({
        id: yup.string().required(),
        name: yup.string().required(),
        avatar: yup.string().url().required(),
        createdAt: yup.date().required()
    })

    const formik = useFormik({
        initialValues: { id: '', name: '', avatar: '', createdAt: new Date() },
        validationSchema: customerSchema,
        onSubmit: (values) => {
            confirmFunction(values)
        }        
    })


    useEffect(() => {
        formik.setFieldValue('id', customer.id)
        formik.setFieldValue('name', customer.name)
        formik.setFieldValue('avatar', customer.avatar)
        formik.setFieldValue('createdAt', customer.createdAt)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customer])

    return (
        <Modal open={open} onClose={() => cancelFunction()}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}
        >
            <Box component={Paper}
                sx={{
                    borderRadius: '20px', padding: '20px', width: "500px",
                    display: "flex", justifyContent: "center", flexDirection: "column", gap: "10px"
                }}
            >

                <form onSubmit={formik.handleSubmit} id="form-customer">
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <TextField fullWidth id="name" label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />

                        <TextField fullWidth id="avatar" label="Avatar URL" 
                            value={formik.values.avatar}
                            onChange={formik.handleChange}
                            error={formik.touched.avatar && Boolean(formik.errors.avatar)}
                            helperText={formik.touched.avatar && formik.errors.avatar}
                        />
                    </Box>
                </form>
                <Box sx={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
                >
                    <Button variant="contained" color="error" onClick={() => cancelFunction()}>Cancelar</Button>

                    <Button type="submit" form="form-customer"
                        variant="contained" color="success"
                    >
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export { ModalEditCustomer }