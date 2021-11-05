import { AxiosInstance } from "axios";
import { GetBalanceResponse, MultipleTransactionData, SendCelo, SendCeloResponse, SendCusd, SendCusdResponse, SendMultipleTransaction } from "../../types/sdk";


class Transaction {
    instance: AxiosInstance;
    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    async getBalances() {
        try {
            const req = await this.instance.get<GetBalanceResponse>('/transaction/balance')
            return req.data;
        } catch (error) {
            throw error
        }
    }


    async sendCelo(data: SendCelo) {
        try {
            const req = await this.instance.post<SendCeloResponse>('/transaction/sendCelo', { ...data })
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async sendCUSD(data: SendCusd) {
        try {
            const req = await this.instance.post<SendCusdResponse>('/transaction/sendCUSD', { ...data })
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async sendMultipleTransactions(data: Array<MultipleTransactionData>) {
        try {
            const val = localStorage.getItem('user')
            if (val) {
                const obj = JSON.parse(val)
                console.log(obj, data)

                const body: SendMultipleTransaction = {
                    multipleAddresses: data,
                    phrase: obj.encryptedPhrase
                }

                const req = await this.instance.post('/transaction/multipleTran', body)
                return req.data
            } else {
                throw new Error('Invalid Data in Localstorage')
            }
        } catch (error) {
            throw error
        }
    }
}

export default Transaction;