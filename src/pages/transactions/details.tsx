import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { generate } from "shortid";
import Web3 from "web3";
import TransactionItem from "../../components/transactionItem";
import { useLazyGetTransactionsQuery } from "../../redux/api";
import { useAppSelector } from "../../redux/hooks";
import { SelectCurrencies } from "../../redux/reducers/currencies";
import { selectStorage } from "../../redux/reducers/storage";
import { Coins, TransactionFeeTokenName } from "../../types/coins";
import { TransactionDirection, TransactionStatus, TransactionType } from "../../types/dashboard/transaction";
import transactions from "./transactions";


const Details = () => {
    const storage = useAppSelector(selectStorage);
    const currencies = useAppSelector(SelectCurrencies)

    const [take, setTake] = useState(4)
    const [trigger, { data: transactions, error: transactionError, isLoading }] = useLazyGetTransactionsQuery()

    useEffect(() => {
        trigger({ address: storage!.accountAddress, take: 100 })
        const interval = setInterval(() => {
            trigger({ address: storage!.accountAddress, take: 100 })
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (transactions) {
            
        }
    }, [transactions])

    return <>
        <div>
            <div className="w-full shadow-custom px-5 pt-4 pb-6 rounded-xl flex flex-col">
                <div className="">
                    Transaction Details
                </div>
                <div className="grid grid-cols-3">
                    {TransactionDetailInput("Transaction Hash", <>Hash</>)}
                </div>
            </div>
        </div>
    </>
}

export default Details;


const TransactionDetailInput = (title: string, children: JSX.Element | JSX.Element[]) => {

    return <div className="bg-greylish bg-opacity-60 flex flex-col px-4 py-3">
        <div>
            {title}
        </div>
        <div>
            {children}
        </div>
    </div>
}