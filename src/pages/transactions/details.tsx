import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { generate } from "shortid";
import Web3 from "web3";
import Dropdown from "../../components/dropdown";
import TransactionItem from "../../components/transactionItem";
import { useLazyGetTransactionsQuery } from "../../redux/api";
import { useAppSelector } from "../../redux/hooks";
import { SelectCurrencies } from "../../redux/reducers/currencies";
import { selectStorage } from "../../redux/reducers/storage";
import { Coins, CoinsURL, TransactionFeeTokenName } from "../../types/coins";
import { TransactionDirection, TransactionStatus, TransactionType } from "../../types/dashboard/transaction";
import { DropDownItem } from "../../types/dropdown";
import transactions from "./transactions";


const Details = () => {
    const storage = useAppSelector(selectStorage);
    const currencies = useAppSelector(SelectCurrencies)

    const [take, setTake] = useState(4)
    const [trigger, { data: transactions, error: transactionError, isLoading }] = useLazyGetTransactionsQuery()

    useEffect(() => {
        trigger({ address: storage!.accountAddress, take: 100 })
    }, [])

    useEffect(() => {
        if (transactions) {

        }
    }, [transactions])

    return <>
        <div>
            <div className="w-full shadow-custom px-5 py-14 rounded-xl flex flex-col">
                <div className="font-bold text-2xl">
                    Transaction Details
                </div>
                <div className="grid grid-cols-3 py-5 gap-14">
                    <Dropdown className="h-full bg-greylish bg-opacity-10"  onSelect={(w: DropDownItem) => {
                        window.open(`https://explorer.celo.org/tx/${w.name}/token-transfers`, '_blank')
                    }} nameActivation={true} selected={{ name: "0xssadasdasdsadasda3s", coinUrl: CoinsURL.None }} list={[
                        { name: "0xssadasdasdsadasdas", coinUrl: CoinsURL.None },
                        { name: "0xssadasdasdsadasdas", coinUrl: CoinsURL.None },
                        { name: "0xssadasdasdsadasdas", coinUrl: CoinsURL.None },
                        { name: "0xssadasdasdsadasdas", coinUrl: CoinsURL.None },
                        { name: "0xssadasdasdsadasdas", coinUrl: CoinsURL.None },
                        { name: "0xssadasdasdsadasdas", coinUrl: CoinsURL.None },
                        { name: "0xssadasdasdsadasdas", coinUrl: CoinsURL.None },
                        { name: "0xssadasdasdsadasdas", coinUrl: CoinsURL.None },
                        { name: "0xssadasdasdsadasdas", coinUrl: CoinsURL.None },
                        { name: "0xssadasdasdsadasdas", coinUrl: CoinsURL.None },
                        { name: "0xssadasdasdsadasdas", coinUrl: CoinsURL.None },
                        { name: "0xssadasdasdsadasdas", coinUrl: CoinsURL.None }
                    ]} />
                    {TransactionDetailInput("Transaction Hash", "Hash")}
                    {TransactionDetailInput("Transaction Hash", "Hash")}
                    {TransactionDetailInput("Transaction Hash", "Hash")}
                    {TransactionDetailInput("Transaction Hash", "Hash")}
                    {TransactionDetailInput("Transaction Hash", "Hash")}
                    {TransactionDetailInput("Transaction Hash", "Hash")}
                    {TransactionDetailInput("Transaction Hash", "Hash")}
                    {TransactionDetailInput("Transaction Hash", "Hash")}
                </div>
            </div>
        </div>
    </>
}

export default Details;


const TransactionDetailInput = (title: string, children: JSX.Element | JSX.Element[] | string) => {

    return <div className="bg-greylish bg-opacity-10 flex flex-col px-4 py-3 rounded-xl">
        <div className="text-sm text-greylish opacity-80">
            {title}
        </div>
        <div className="font-bold text-lg">
            {children}
        </div>
    </div>
}