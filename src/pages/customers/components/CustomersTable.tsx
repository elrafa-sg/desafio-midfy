import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import MuiTable from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { MdDelete, MdEdit } from 'react-icons/md'

import { format } from 'date-fns'
import { Typography } from '@mui/material'

interface Customer {
    id: string,
    createdAt: Date,
    name: string,
    avatar: string,
}

interface CustomersTableProps {
    customersList: Customer[],
    editFunction: Function,
    deleteFunction: Function
}

const CustomersTable = (props: CustomersTableProps) => {
    const { customersList, editFunction, deleteFunction } = props

    function generateActions(customerId: string) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button color='info' variant='contained' sx={{ gap: 1 }} onClick={() => editFunction(customerId)}>
                    <MdEdit />
                    <Typography>Edit</Typography>
                </Button>
                <Button color='error' variant='contained' sx={{ gap: 1 }} onClick={() => deleteFunction(customerId)}>
                    <MdDelete />
                    <Typography>Delete</Typography>
                </Button>
            </Box>
        )
    }

    return (
        <TableContainer component={Paper}>
            <MuiTable sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Created At</TableCell>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {customersList.map(customer => (
                        <TableRow key={customer.id}>
                            <TableCell>{format(customer.createdAt, "dd/MM/yyyy")}</TableCell>
                            <TableCell>{customer.avatar}</TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{generateActions(customer.id)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    )
}

export { CustomersTable }