import React, { useState, useRef, useEffect, useContext, useCallback, SyntheticEvent } from "react";
import Dropdown from "../../components/dropdown";
import { generate } from 'shortid'
import { useHistory } from 'react-router-dom'
import SDK from "../../utility/sdk";
import { Data } from "../../App";
import ClipLoader from "react-spinners/ClipLoader";
import Success from "../../components/success";
import Error from "../../components/error";
import { DropDownItem } from "../../types/dropdown";
import { GetBalanceResponse, MultipleTransactionData } from "../../types/sdk";
import CSV from '../../utility/importCSV'

const Input = ({ index, name, address, amount }: { index: number, name: Array<string>, address: Array<string>, amount: Array<string> }) => <>
    <input className="border text-black px-3 py-1 rounded-md" placeholder="Name" defaultValue={name[index]} type="text" name={`name__${index}`} onChange={(e) => name[index] = e.target.value} required />
    <input className="border text-black px-3 py-1 rounded-md" placeholder="Address" defaultValue={address[index]} type="text" name={`address__${index}`} onChange={(e) => address[index] = e.target.value} required />
    <input className="border text-black px-3 py-1 rounded-md" placeholder="Amount" defaultValue={amount[index]} type="number" name={`amount__${index}`} onChange={(e) => amount[index] = e.target.value} required step={'any'} />
    <div></div>
</>

const Pay = () => {
    const context = useContext(Data)
    const [index, setIndex] = useState(1)
    const [data, setData] = useState<GetBalanceResponse>()
    const [isPaying, setIsPaying] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const [isError, setError] = useState(false)
    const nameRef = useRef<Array<string>>([])
    const addressRef = useRef<Array<string>>([])
    const amountRef = useRef<Array<string>>([])

    const [csvImport, setCsvImport] = useState<string[][]>([]);
    const router = useHistory();
    const sdk = useRef<SDK>();
    const fileInput = useRef<HTMLInputElement>(null);

    const [selectedWallet, setSelectedWallet] = useState<DropDownItem>();

    useEffect(() => {
        if (csvImport.length > 0) {
            for (let index = 0; index < csvImport.length; index++) {
                const [name, address, amount] = csvImport[index]
                nameRef.current.push(name);
                addressRef.current.push(address);
                amountRef.current.push(amount);
            }
            setIndex((index===1?0:index) + csvImport.length)
            fileInput.current!.files = new DataTransfer().files;
        }
    }, [csvImport])

    useEffect(() => {
        if (context.data) {
            sdk.current = new SDK(context.data.token)
            sdk.current.getBalances().then(data => setData(data)).catch(e => console.error(e))
        }
    }, [context.data])

    useEffect(() => {
        if (data) {
            setSelectedWallet({ name: "Celo", type: "celo", amount: data.celoBalance })
        }
    }, [data])

    const Submit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result: Array<MultipleTransactionData> = []

        const [nameList, addressList, amountList] = [nameRef.current, addressRef.current, amountRef.current]

        if (selectedWallet && selectedWallet.type && nameList.length === addressList.length && nameList.length === amountList.length) {
            for (let index = 0; index < nameList.length; index++) {
                result.push({
                    toAddress: addressList[index],
                    amount: amountList[index],
                    walletType: selectedWallet.type
                })
            }
        }

        if (result.length === 1 && sdk.current && selectedWallet && selectedWallet.name) {
            setIsPaying(true)
            if (selectedWallet!.name.toLowerCase() === "celo") {
                sdk.current.sendCelo({
                    toAddress: result[0].toAddress,
                    amount: result[0].amount,
                    phrase: context.data!.encryptedPhrase
                }).then(w => { setIsPaying(false); setSuccess(true); }).catch(w => { console.error(w); setError(true); setIsPaying(false); })
            } else if (selectedWallet.name.toLowerCase() === "cusd") {
                sdk.current.sendCUSD({
                    toAddress: result[0].toAddress,
                    amount: result[0].amount,
                    phrase: context.data!.encryptedPhrase
                }).then(w => { setIsPaying(false); setSuccess(true); }).catch(w => { console.error(w); setError(true); setIsPaying(false); })
            }
        }
        else if (result.length > 1 && sdk.current) {
            setIsPaying(true)
            const arr: Array<MultipleTransactionData> = result.map(w => {
                return {
                    toAddress: w.toAddress,
                    amount: w.amount,
                    walletType: w.walletType
                }
            })
            sdk.current.sendMultipleTransactions(arr).then(e => { setIsPaying(false); setSuccess(true); }).catch(err => { console.error(err); setError(true); setIsPaying(false); })
        }

    }

    return <div className="px-32">
        <form onSubmit={Submit}>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-left w-full">
                    <div>Pay Someone</div>
                </div>
                <div className="min-w-[85vw] min-h-[75vh] h-auto shadow-xl border flex flex-col gap-10 py-10">
                    <div className="flex flex-col pl-12 pr-[25%] gap-10">
                        <div className="flex flex-col">
                            <span className="text-left">Paying From</span>
                            <div className="grid grid-cols-4">
                                {!(data && selectedWallet) ? <ClipLoader /> : <Dropdown onSelect={setSelectedWallet} nameActivation={true} selected={selectedWallet} list={[{ name: "Celo", type: 'celo', amount: `${data.celoBalance}` }, { name: "cUSD", type: 'cUsd', amount: `${data.cUSDBalance}` }]} />}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex justify-between py-4 items-center">
                                <span className="text-left">Paying To</span>
                                <button type="button" onClick={() => {
                                    fileInput.current?.click()
                                }} className="px-2 py-1 shadow-lg border border-primary text-primary rounded-xl text-sm font-light hover:text-white hover:bg-primary">
                                    + Import CSV
                                </button>
                                <input ref={fileInput} type="file" className="hidden" onChange={(e) => e.target.files!.length>0?CSV.Import(e.target.files![0]).then(e => setCsvImport(e)).catch(e=>console.error(e)):null} />
                            </div>
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
                                <textarea className="border-2 rounded-xl" name="description" id="" cols={30} rows={5}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-2 w-[400px] justify-center gap-5">
                            <button type="button" className="border-2 border-primary px-3 py-2 text-primary" onClick={() => router.goBack()}>Close</button>
                            <button type="submit" className="bg-primary px-3 py-2 text-white flex items-center justify-center">{isPaying ? <ClipLoader /> : 'Pay'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        {isSuccess && <Success onClose={setSuccess} />}
        {isError && <Error onClose={setError} />}
    </div>
}



export default Pay;