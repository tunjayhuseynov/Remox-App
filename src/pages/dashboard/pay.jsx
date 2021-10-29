import { useState, useRef, useEffect, useContext, useCallback } from "react";
import Dropdown from "../../components/dropdown";
import { generate } from 'shortid'
import { useHistory } from 'react-router-dom'
import SDK from "../../utility/sdk";
import { Data } from "../../App";
import ClipLoader from "react-spinners/ClipLoader";
import Success from "../../components/pay/success";
import Error from "../../components/pay/error";


const Input = ({ index, name, address, amount }) => <>
    <input className="border text-black px-3 py-1 rounded-md" placeholder="Name" defaultValue={name[index]} type="text" name={`name__${index}`} onChange={(e) => name[index] = e.target.value} required />
    <input className="border text-black px-3 py-1 rounded-md" placeholder="Address" defaultValue={address[index]} type="text" name={`address__${index}`} onChange={(e) => address[index] = e.target.value} required />
    <input className="border text-black px-3 py-1 rounded-md" placeholder="Amount" defaultValue={amount[index]} type="number" name={`amount__${index}`} onChange={(e) => amount[index] = e.target.value} required step={'any'}/>
    <div></div>
</>

const Pay = () => {
    const context = useContext(Data)
    const [index, setIndex] = useState(1)
    const [data, setData] = useState()
    const [isPaying, setIsPaying] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const [isError, setError] = useState(false)
    const nameRef = useRef([])
    const addressRef = useRef([])
    const amountRef = useRef([])
    const router = useHistory();
    const sdk = useRef();

    const [selectedWallet, setSelectedWallet] = useState();

    useEffect(() => {
        if (context.data) {
            sdk.current = new SDK(context.data.token)
            sdk.current.getBalances().then(data => setData(data)).catch(e => console.error(e))
        }
    }, [])

    useEffect(() => {
        if (data) {
            setSelectedWallet({ name: "Celo", type: "celo", amount: data.celoBalance })
        }
    }, [data])

    const Submit = (e) => {
        e.preventDefault()

        const result = []

        const [nameList, addressList, amountList] = [nameRef.current, addressRef.current, amountRef.current]

        if (nameList.length === addressList.length && nameList.length === amountList.length) {
            for (let index = 0; index < nameList.length; index++) {
                result.push({
                    toAddress: addressList[index],
                    amount: amountList[index],
                    walletType: selectedWallet.type
                })
            }
        }

        if (result.length === 1) {
            setIsPaying(true)
            if (selectedWallet.name.toLowerCase() === "celo") {
                sdk.current.sendCelo({
                    toAddress: result[0].toAddress,
                    amount: result[0].amount,
                    phrase: context.data.encryptedPhrase
                }).then(w => {setIsPaying(false); setSuccess(true);}).catch(w => {console.error(w); setError(true); setIsPaying(false);})
            } else if (selectedWallet.name.toLowerCase() === "cusd") {
                sdk.current.sendCUSD({
                    toAddress: result[0].toAddress,
                    amount: result[0].amount,
                    phrase: context.data.encryptedPhrase
                }).then(w => {setIsPaying(false); setSuccess(true);}).catch(w => {console.error(w); setError(true); setIsPaying(false);})
            }
        }
        else if (result.length > 1) {
            setIsPaying(true)
            sdk.current.sendMultipleTransactions(result.map(w => {
                return {
                    toAddress: w.toAddress,
                    amount: w.amount,
                    walletType: w.walletType
                }
            })).then(e => {setIsPaying(false); setSuccess(true);}).catch(err => {console.error(err); setError(true); setIsPaying(false); })
        }

    }

    return <div className="px-32">
        <form onSubmit={Submit}>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-left w-full">Pay Someone</div>
                <div className="min-w-[85vw] min-h-[75vh] h-auto shadow-xl border flex flex-col gap-10 py-10">
                    <div className="flex flex-col pl-12 pr-[25%] gap-10">
                        <div className="flex flex-col">
                            <span className="text-left">Paying From</span>
                            <div className="grid grid-cols-4">
                                {!(data && selectedWallet) ? <ClipLoader /> : <Dropdown onSelect={setSelectedWallet} price="true" selected={selectedWallet} list={[{ name: "Celo", type: 'celo', amount: `${data.celoBalance}` }, { name: "cUSD", type: 'cUsd', amount: `${data.cUSDBalance}` }]} />}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-left">Paying To</span>
                            <div className="grid grid-cols-[25%,45%,25%,5%] gap-5">
                                {Array(index).fill(" ").map((e, i) => <Input key={generate()} index={i} name={nameRef.current} address={addressRef.current} amount={amountRef.current} />)}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="grid grid-cols-4">
                                <button type="button" className="px-6 py-3 min-w-[200px] border-2 border-primary text-primary rounded-xl" onClick={() => setIndex(index + 1)}>
                                    + Add More
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-left">Description (Optional)</span>
                            <div className="grid grid-cols-1">
                                <textarea className="border-2 rounded-xl" name="description" id="" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-2 w-[400px] justify-center gap-5">
                            <button type="buttom" className="border-2 border-primary px-3 py-2 text-primary" onClick={() => router.goBack()}>Close</button>
                            <button type="submit" className="bg-primary px-3 py-2 text-white flex items-center justify-center">{isPaying ? <ClipLoader /> : 'Pay'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        {isSuccess && <Success onClose={setSuccess}/>}
        {isError && <Error onClose={setError}/>}
    </div>
}



export default Pay;