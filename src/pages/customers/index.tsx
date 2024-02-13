import { useEffect, useState, useCallback } from 'react'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { CustomersTable } from './components/CustomersTable'

import { CustomersService } from '../../services/consumersService'
import { ModalEditCustomer } from './components/ModalEditCustomer';
import { ModalDeleteCustomer } from './components/ModalDeleteCustomer';
import Customer from '../../models/Customer';

const Customers = () => {
    const [customersList, setCustomersList] = useState<Customer[]>([])
    const [selectedCustomer, setSelectedCustomer] = useState<Customer>({id: '', avatar: '', createdAt: new Date(), name: ''})

    const [showModalEditCustomer, setShowModalEditCustomer] = useState(false)
    const [showModalDeleteCustomer, setShowModalDeleteCustomer] = useState(false)

    const loadCustomers = useCallback(async () => {
        const customersResponse = await CustomersService.getCustomers();
        if (customersResponse.status === 200) {
            setCustomersList(customersResponse.data)
        }
    }, [])

    useEffect(() => {
        loadCustomers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleEditCustomer(customerId: string) {
        setSelectedCustomer(customersList.filter(x => x.id === customerId)[0])
        setShowModalEditCustomer(true)
    }

    async function updateCustomer(newCustomerData: Customer) {
        const updateCustomer = await CustomersService.updateCustomer(newCustomerData)
        setShowModalEditCustomer(false)
        if (updateCustomer.status === 200) {
            loadCustomers()
        }
    }

    function handleDeleteCustomer(customerId: string) {
        setSelectedCustomer(customersList.filter(x => x.id === customerId)[0])
        setShowModalDeleteCustomer(true)
    }

    async function deleteCustomer() {
        const deleteCustomerResponse = await CustomersService.deleteCustomer(selectedCustomer.id)
        setShowModalDeleteCustomer(false)
        if (deleteCustomerResponse.status === 200) {
            loadCustomers()            
        }
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
                    confirmFunction={updateCustomer}
                    customer={selectedCustomer}
                />

                <ModalDeleteCustomer open={showModalDeleteCustomer}
                    cancelFunction={() => setShowModalDeleteCustomer(false)}
                    confirmFunction={() => deleteCustomer()}
                />

                <CustomersTable 
                    customersList={customersList} 
                    editFunction={handleEditCustomer}
                    deleteFunction={handleDeleteCustomer}
                />
            </Container>
        </Box>
    )
}

export default Customers