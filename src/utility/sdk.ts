import axios, { AxiosInstance } from "axios";
import {use}  from "typescript-mix";
import Account from './sdk/account'
import Transaction from './sdk/transaction'
import Customer from './sdk/customer'
import Team from './sdk/team'
import TeamMember from './sdk/teamMember'

interface SDK extends Transaction, Account, Customer, TeamMember, Team {}

class SDK{
    @use(Transaction, Account, Customer, Team, TeamMember) this:any

    constructor(token?: string) {
        const ax = axios.create({
            baseURL: 'https://remox-backend.herokuapp.com',
            timeout: 15000,
            headers: { 'Authorization': `Bearer ${token}` }
        });
        this.instance = ax;
    }
    instance: AxiosInstance;

}

export default SDK;