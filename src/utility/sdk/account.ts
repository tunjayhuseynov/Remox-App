import { AxiosInstance } from "axios";
import { AccountCreate, AccountInfo ,AccountCreateResponse, AccountExist, AccountExistResponse, CreatePassword, CreatePasswordResponse, Signin, SigninResponse, UnlockResponse } from "../../types/sdk";

class Account {
    instance: AxiosInstance;
    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }
    async signIn(data: Signin) {
        try {
            const req = await this.instance.post<SigninResponse>('/account/signin', { ...data })
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async accountCreate(data: AccountCreate) {
        try {
            const req = await this.instance.post<AccountCreateResponse>('/account/create', { ...data })
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async createPassword(data: CreatePassword) {
        try {
            const req = await this.instance.post<CreatePasswordResponse>('/account/createPassword', { ...data })
            return req.data;
        } catch (error) {
            throw error
        }
    }

    async accountExist(data: AccountExist) {
        try {
            const req = await this.instance.post<AccountExistResponse>('/account/isExist', { ...data })
            return req.data;
        } catch (error) {
            throw error
        }
    }

    /**
 * @data Password
 **/
    async unlock(data: String) {
        try {
            const val = localStorage.getItem('user')
            if (val) {
                const obj = JSON.parse(val)

                const req = await this.instance.post<UnlockResponse>('/account/reLogin', {
                    password: data,
                    address: obj.accountAddress
                })
                return req.data
            } else {
                throw new Error('Invalid Data in Localstorage')
            }
        } catch (error) {
            throw error
        }  
    }

    async PutAccountInfo(data: AccountInfo) {
        try {
            const req = await this.instance.put<AccountInfo>("/account", data)
            return req.data;
        } catch (error) {
            throw error
        }
    }

}

export default Account;