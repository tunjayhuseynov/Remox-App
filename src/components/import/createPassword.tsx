import Input from "../input"
import { useHistory } from 'react-router-dom'
import SDK from "../../utility/sdk";
import { useContext, useState } from 'react'
import { Data } from "../../App";
import { ClipLoader } from "react-spinners";
import { LocalStorageData } from "../../types/context";
import { SyntheticEvent } from "react";

const CreatePassword = ({ phrase }: { phrase: string }) => {
    const router = useHistory();
    const ctx = useContext(Data)
    const [loader, setLoader] = useState(false)

    const Submitted = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;

        const sdk = new SDK()
        setLoader(true)
        sdk.createPassword({ phrase: phrase.trim(), password: target["password"]?.value?.trim() }).then((data) => {
            setLoader(false)
            const obj: LocalStorageData = {
                accountAddress: data.accountAddress,
                encryptedPhrase: data.encryptedPhrase,
                token: data.token,
            };

            localStorage.setItem("user", JSON.stringify(obj));

            ctx.setData!(obj)
            ctx.setUnlock!(true)
            router.push('/dashboard')

        }).catch(w => { console.error(w); setLoader(false) })
    }

    return <div className="h-screen">
        <form onSubmit={Submitted} className="h-full">
            <section className="flex flex-col items-center  h-full justify-center gap-10">
                <div className="flex flex-col gap-4">
                    <div className="text-center text-3xl text-primary">Set Account Details</div>
                    <div className="text-center text-greylish tracking-wide font-light text-lg">This password encrypts your accounts on this device.</div>
                </div>
                <div className="grid grid-cols-2 gap-x-24 gap-y-8">
                    <Input title="Password" name="password" type="password" />
                </div>
                <div className="flex justify-center items-center gap-10 pt-8">
                    <button className="rounded-xl w-[150px] h-[50px] border-2 border-primary text-primary shadow-lg bg-white" onClick={() => router.push('/')}>Back</button>
                    <button type="submit" className="rounded-xl w-[150px] h-[50px] text-white shadow-lg bg-primary">{loader ? <ClipLoader /> : 'Set Password'}</button>
                </div>
            </section>
        </form>
    </div>
}

export default CreatePassword;