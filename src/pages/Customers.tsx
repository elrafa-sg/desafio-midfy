import { useEffect, useState, useCallback } from 'react'
import { CustomersService } from '../services/consumersService'

const Customers = () => {
    const [customersList, setCustomersList] = useState([])

    const loadConsumers = useCallback(async () => {
        alert('o')
        const consumersResponse = await CustomersService.getCustomers();
        console.log('lista ', consumersResponse)

    }, [])

    useEffect(() => {
        alert('heim')
        loadConsumers()
    }, [loadConsumers])


    return(
        <div>
            CONSUMERS
        </div>
    )
}

export default Customers