import React, { useMemo, useRef, useContext, FormEvent, Dispatch } from 'react';
import Input from '../input'
import { useHistory } from 'react-router-dom'
import SDK from '../../utility/sdk';
import { generate } from 'shortid'
import { Data } from '../../App';
import { AccountCreate } from '../../types/sdk';
import { SyntheticEvent } from 'react';
import { PassDataFromSetToPhrase } from '../../types/create'

// SET Component
const Set = ({ setData }: { setData: Dispatch<PassDataFromSetToPhrase> }) => {
    const sdk = useRef(new SDK())
    const router = useHistory()
    const ctx = useContext(Data);
    const list = useMemo<Array<{ title: string, type?: string, name: string }>>(() => [
        { title: "First Name", name: "userName" }, { title: "Last Name", name: "surname" },
        { title: "Organization Name", name: "companyName" }, { title: "Password", name: "password", type: "password" },
    ], [])

    const create = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement

        if (target["password"].value !== target["repeatPassword"].value) return

        const inputData: AccountCreate = {
            userName: target["userName"].value,
            surname: target["surname"].value,
            companyName: target["companyName"].value,
            password: target["password"].value,
        }

        sdk.current.accountCreate(inputData).then(data => {
            const obj = {
                accountAddress: data.accountAddress,
                encryptedPhrase: data.encryptedPhrase,
                token: data.token,
                userName: inputData.userName,
                surname: inputData.surname,
                companyName: inputData.companyName,
            };

            localStorage.setItem("user", JSON.stringify(obj));

            ctx.setData!(obj)

            const pass: PassDataFromSetToPhrase = {
                accountAddress: data.accountAddress,
                mnemonic: data.mnemonic,
            }

            setData(pass)

        }).catch(e => console.error(e))
    }

    return <form onSubmit={create} className="h-full">
        <section className="flex flex-col items-center  h-full justify-center gap-10">
            <div className="flex flex-col gap-4">
                <div className="text-3xl text-primary">Set Account Details</div>
                <div className="text-greylish tracking-wide font-light text-lg">This password encrypts your accounts on this device.</div>
            </div>
            <div className="grid grid-cols-3 gap-x-24 gap-y-8">
                {list.map(w => <Input key={generate()} {...w} />)}
            </div>
            <div className="flex justify-center items-center gap-10 pt-8">
                <button className="rounded-xl w-[150px] h-[50px] border-2 border-primary text-primary shadow-lg bg-white" onClick={() => router.push('/')}>Back</button>
                <button type="submit" className="rounded-xl w-[150px] h-[50px] text-white shadow-lg bg-primary">Set Account</button>
            </div>
        </section>
    </form>
}


export default Set;