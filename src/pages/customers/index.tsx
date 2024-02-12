import { useEffect, useState, useCallback } from 'react'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';


import { CustomersTable } from './components/CustomersTable'

import { CustomersService } from '../../services/consumersService'
import { ModalEditCustomer } from './components/ModalEditCustomer';
import { ModalDeleteCustomer } from './components/ModalDeleteCustomer';

const Customers = () => {
    const [customersList, setCustomersList] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState(0)

    const [showModalEditCustomer, setShowModalEditCustomer] = useState(false)
    const [showModalDeleteCustomer, setShowModalDeleteCustomer] = useState(false)

    const loadConsumers = useCallback(async () => {
        const customersResponse = await CustomersService.getCustomers();
        if (customersResponse.status === 200) {
            setCustomersList(customersResponse.data)
        }
    }, [])

    useEffect(() => {
        loadConsumers()
    }, [])

    function editCustomer(customerId: number) {
        setSelectedCustomer(customerId)
        setShowModalEditCustomer(true)
    }

    function deleteCustomer(customerId: number) {
        setSelectedCustomer(customerId)
        setShowModalDeleteCustomer(true)
    }

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <ModalEditCustomer open={showModalEditCustomer} 
                    cancelFunction={() => setShowModalEditCustomer(false)}
                    confirmFunction={() => alert('salvou')}
                />

                <ModalDeleteCustomer open={showModalDeleteCustomer}
                    cancelFunction={() => setShowModalDeleteCustomer(false)}
                    confirmFunction={() => alert('deletou')}
                />

                <CustomersTable 
                    customersList={customersList} 
                    editFunction={editCustomer}
                    deleteFunction={deleteCustomer}
                />
            </Container>
        </Box>
    )
}

export default Customers