import PhraseBar from '../components/phraseBar';
import Header from '../layouts/home/header'
import { useRef, useContext, useState, useEffect } from 'react'
import { Data } from '../App';
import SDK from '../utility/sdk'
import { useLocation, useHistory } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';

const Unlock = ({ setUnlock, unlock }) => {
    const data = useContext(Data)
    const inputRef = useRef(null)
    const location = useLocation()
    const router = useHistory()
    const [incorrrect, setIncorrect] = useState(false)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (router && data.data === undefined) router.push('/')
    }, [unlock, location, router, data.data])

    const Submit = () => {
        setIncorrect(false);
        setLoader(true)
        const sdk = new SDK(data?.data?.token)
        sdk.unlock(inputRef.current.value.trim()).then(e => {
            localStorage.setItem(`user`, JSON.stringify({ ...data.data, token: e.token }))
            setUnlock(true)
            setLoader(false)
            router.goBack();
        }).catch(s => { setIncorrect(true); console.error(s); setLoader(false) })
    }

    return <>
        <Header />
        <section className="flex flex-col justify-center items-center h-screen gap-8">
            <h2 className="text-3xl text-primary">Unlock Your Wallet</h2>
            <div className="flex flex-col gap-3">
                <div>Public Address</div>
                {data.data && <PhraseBar address={data.data?.accountAddress} scanIcon={false} />}
            </div>
            <div className="flex flex-col gap-4">
                <div>Enter your password to unlock your wallet</div>
                <div className="flex justify-center"><input onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        Submit()
                    }
                }} ref={inputRef} type="password" autoComplete='new-password' className="bg-greylish bg-opacity-10 px-3 py-2 rounded-lg outline-none" /></div>
                {incorrrect && <div className="text-red-600 text-center">Password is Incorrect</div>}
                <div className="flex justify-center">
                    <button onClick={Submit} className="bg-primary shadow-lg px-5 py-2 text-white rounded-lg">{loader ? <ClipLoader /> : 'Unlock'}</button>
                </div>
            </div>
        </section>
    </>
}


export default Unlock;