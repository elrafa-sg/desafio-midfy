import { useEffect, useState, useCallback } from 'react'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import { CustomersTable } from './components/CustomersTable'

import { CustomersService } from '../../services/consumersService'
import { ModalEditCustomer } from './components/ModalEditCustomer';
import { ModalDeleteCustomer } from './components/ModalDeleteCustomer';
import Customer from '../../models/Customer';

const Customers = () => {
    const [customersList, setCustomersList] = useState<Customer[]>([])
    const [selectedCustomer, setSelectedCustomer] = useState<Customer>({ id: '', avatar: '', createdAt: new Date(), name: '' })

    const [showModalEditCustomer, setShowModalEditCustomer] = useState(false)
    const [showModalDeleteCustomer, setShowModalDeleteCustomer] = useState(false)

    const [alertData, setAlertData] = useState<{ text?: string, severity?: AlertColor, visible: boolean }>({ text: '', severity: 'success', visible: false })
    const [showLoading, setShowLoading] = useState(false);

    const loadCustomers = useCallback(async () => {
        setShowLoading(true);
        const customersResponse = await CustomersService.getCustomers();
        if (customersResponse.status === 200) {
            setCustomersList(customersResponse.data)
        }
        setShowLoading(false);
    }, [])

    useEffect(() => {
        loadCustomers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function showAlert(text: string, severity: AlertColor) {
        setAlertData({ text, severity, visible: true });
        setTimeout(() => {
            setAlertData({ visible: false })
        }, 3500);
    }

    function handleEditCustomer(customerId: string) {
        setSelectedCustomer(customersList.filter(x => x.id === customerId)[0])
        setShowModalEditCustomer(true)
    }

    async function updateCustomer(newCustomerData: Customer) {
        setShowModalEditCustomer(false)
        setShowLoading(true);
        const updateCustomer = await CustomersService.updateCustomer(newCustomerData)
        if (updateCustomer.status === 200) {
            loadCustomers()
            showAlert('Customer atualizado com sucesso!', 'success');
        }
        setShowLoading(false);
    }

    function handleDeleteCustomer(customerId: string) {
        setSelectedCustomer(customersList.filter(x => x.id === customerId)[0])
        setShowModalDeleteCustomer(true)
    }

    async function deleteCustomer() {
        setShowModalDeleteCustomer(false)
        setShowLoading(true);
        const deleteCustomerResponse = await CustomersService.deleteCustomer(selectedCustomer.id)
        if (deleteCustomerResponse.status === 200) {
            loadCustomers()
            showAlert('Customer deletado com sucesso!', 'success');
        }
        setShowLoading(false);
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
                {
                    alertData.visible && (
                        <Box sx={{ position: 'absolute', zIndex: 9999, top: '10px', right: '10px' }}>
                            <Alert severity={alertData.severity}>
                                {alertData.text}
                            </Alert>
                        </Box>
                    )
                }

                <ModalEditCustomer open={showModalEditCustomer}
                    cancelFunction={() => setShowModalEditCustomer(false)}
                    confirmFunction={updateCustomer}
                    customer={selectedCustomer}
                />

                <ModalDeleteCustomer open={showModalDeleteCustomer}
                    cancelFunction={() => setShowModalDeleteCustomer(false)}
                    confirmFunction={() => deleteCustomer()}
                />

                {
                    showLoading
                        ? (
                            <Box sx={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                height: '80vh'
                            }}>
                                <CircularProgress size={100} />
                            </Box>
                        )
                        : (
                            <CustomersTable
                                customersList={customersList}
                                editFunction={handleEditCustomer}
                                deleteFunction={handleDeleteCustomer}
                            />
                        )
                }

            </Container>
        </Box>
    )
}

export default Customers