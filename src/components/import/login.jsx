import PhraseBar from '../phraseBar';
import { useRef, useContext, useState, useEffect } from 'react'
import { Data } from '../../App';
import { useLocation, useHistory } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import Header from '../../layouts/home/header';
import SDK from '../../utility/sdk';


const Login = ({ phrase }) => {
    const ctx = useContext(Data)
    const [input, setInput] = useState()
    const router = useHistory()
    const [incorrrect, setIncorrect] = useState(false)
    const [loader, setLoader] = useState(false)
    const location = useLocation()

    const Submitted = (e) => {
        const sdk = new SDK()
        setLoader(true)
        setIncorrect(false)
        sdk.signIn({ phrase: phrase.trim(), password: input?.trim() }).then((data) => {
            setLoader(false)

            const obj = {
                accountAddress: data.accountAddress,
                encryptedPhrase: data.encryptedPhrase,
                token: data.token,
            };

            localStorage.setItem("user", JSON.stringify(obj));

            ctx.setData(obj)
            ctx.setUnlock(true)
            router.push('/dashboard')
            
        }).catch(w => { console.error(w); setLoader(false); setIncorrect(true); })
    }


    return <>
        <Header />
        <section className="flex flex-col justify-center items-center h-screen gap-8">
            <h2 className="text-3xl text-primary">Open Your Wallet</h2>
            <div className="flex flex-col gap-4 items-center">
                <div>Enter your password to open your wallet</div>
                <div className="flex justify-center"><input onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        Submitted()
                    }
                }} onChange={(e) => setInput(e.target.value)} type="password" autoComplete='new-password' className="bg-greylish bg-opacity-10 px-3 py-2 rounded-lg outline-none" /></div>
                {incorrrect && <div className="text-red-600">Password is Incorrect</div>}
                <div className="flex justify-center">
                    <button onClick={Submitted} className="bg-primary shadow-lg px-5 py-2 text-white rounded-lg">{loader ? <ClipLoader /> : 'Unlock'}</button>
                </div>
            </div>
        </section>
    </>
}

export default Login;