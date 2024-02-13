import { apiClient } from "./apiClient";

const BASE_PATH = "/Customers";

class CustomersService {
  static async getCustomers() {
    const getCustomersResponse = await apiClient.get(BASE_PATH);
    return getCustomersResponse;
  }

  static async updateCustomer(customerData: any) {
    const updateCustomersResponse = await apiClient.put(
      `${BASE_PATH}/${customerData.id}`,
      customerData
    );
    return updateCustomersResponse;
  }

  static async createCustomer(customerData: any) {
    const createCustomersResponse = await apiClient.post(
      BASE_PATH,
      customerData
    );
    return createCustomersResponse;
  }

  static async deleteCustomer(customerId: string) {
    const deleteCustomersResponse = await apiClient.delete(
      `${BASE_PATH}/${customerId}`
    );
    return deleteCustomersResponse;
  }
}

export { CustomersService };
