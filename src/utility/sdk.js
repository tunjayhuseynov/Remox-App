import axios from "axios";

class SDK {
    constructor(token) {
        this.instance = axios.create({
            baseURL: 'https://remox-backend.herokuapp.com',
            timeout: 15000,
            headers: { 'Authorization': `Bearer ${token}` }
        });
    }

    async accountCreate(data) {
        try {
            const req = await this.instance.post('/account/create', { ...data })
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async getBalances() {
        try {
            const req = await this.instance.get('/transaction/balance')
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async sendCelo(data) {
        try {
            const req = await this.instance.post('/transaction/sendCelo', { ...data })
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async sendCUSD(data) {
        try {
            const req = await this.instance.post('/transaction/sendCUSD', { ...data })
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async accountExist(data) {
        try {
            const req = await this.instance.post('/account/isExist', { phrase: data })
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async createPassword(data) {
        try {
            const req = await this.instance.post('/account/createPassword', { ...data })
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async signIn(data) {
        try {
            const req = await this.instance.post('/account/signin', { ...data })
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async unlock(data) {
        const val = localStorage.getItem('user')
        if (val) {
            const obj = JSON.parse(val)

            const req = await this.instance.post('/account/reLogin', {
                password: data,
                address: obj.accountAddress
            })
            return req.data
        } else {
            throw new Error('Invalid Data in Localstorage')
        }
    }

    async sendMultipleTransactions(data) {
        try {
            const val = localStorage.getItem('user')
            if (val) {
                const obj = JSON.parse(val)
                console.log(obj, data)

                const req = await this.instance.post('/transaction/multipleTran', {
                    multipleAddresses: data,
                    phrase: obj.encryptedPhrase
                })
                return req.data
            } else {
                throw new Error('Invalid Data in Localstorage')
            }
        } catch (error) {
            throw error
        }
    }
}

export default SDK;