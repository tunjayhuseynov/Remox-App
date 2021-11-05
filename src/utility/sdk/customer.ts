import { AxiosInstance } from "axios";
import { CustomerCreate, CustomerCreateResponse } from "../../types/sdk/Customer/CustomerCreate";
import { GetCustomer } from "../../types/sdk/Customer/GetCustomer";

class Customer {
    instance: AxiosInstance
    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    async CustomerCreate(data: CustomerCreate) {
        try {
            const req = await this.instance.post<CustomerCreateResponse>('/customer/create', data)
            return req.data;
        } catch (error) {
            console.error(error)
        }
    }

    async GetCustomer(data: GetCustomer) {
        try {
            const req = await this.instance.get<CustomerCreateResponse[]>('/customer/byAccount', { params: data })
            return req.data;
        } catch (error) {
            console.error(error)
        }
    }

    async DeleteCustomer(id: number) {
        try {
            const req = await this.instance.delete(`/customer/${id}`)
            return req.data;
        } catch (error) {
            console.error(error)
        }
    }
}

export default Customer;