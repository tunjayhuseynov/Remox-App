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
import { CSVLink } from "react-csv";


const Transactions = () => {
    const storage = useAppSelector(selectStorage);
    const currencies = useAppSelector(SelectCurrencies)

    const [take, setTake] = useState(4)
    const [trigger, { data: transactions, error: transactionError, isLoading }] = useLazyGetTransactionsQuery()

    useEffect(() => {
        trigger({ address: storage!.accountAddress, take: 100 })
        const interval = setInterval(() => {
            trigger({ address: storage!.accountAddress, take: 100 })
        }, 15000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (transactions) {
            transactions.reduce((acc, cur) => {

                return acc;
            }, [])
        }
    }, [transactions])

    return <>
        <div>
            <div className="w-full shadow-custom px-5 pt-4 pb-6 rounded-xl">
                <div id="header" className="grid grid-cols-[45%,30%,10%,15%] border-b border-black pb-5 pl-5" >
                    <div className="font-semibold">Recent Transactions</div>
                    <div className="font-semibold">Total Amount</div>
                    <div className="font-semibold">Status</div>
                    {transactions && <CSVLink className="font-normal place-self-end px-5 py-1 rounded-md cursor-pointer bg-greylish bg-opacity-20 flex items-center justify-center xl:space-x-5" filename={"remox_transactions.csv"} data={transactions.map(w => ({
                        'Sent From:': w.node.celoTransfer.edges[0].node.fromAddressHash,
                        'Amount:': parseFloat(Web3.utils.fromWei(w.node.celoTransfer.edges[0].node.value, 'ether')).toFixed(4) + ` ${Coins[Object.entries(TransactionFeeTokenName).find(s => s[0] === w.node.feeToken)![1]].name}`,
                        'To:': w.node.celoTransfer.edges[0].node.toAddressHash,
                        'Date': dateFormat(new Date(w.node.timestamp), "mediumDate")
                    }))}>
                        <div className={'hidden xl:block'}>Export</div>
                        <img src="/icons/downloadicon.svg" alt="" />
                    </CSVLink>}

                </div>
                <div>
                    {!isLoading && transactions ? transactions.slice(0, take).map((transaction, index) => {
                        const tx = transaction.node;
                        console.log(tx)

                        const amount = parseFloat(Web3.utils.fromWei(tx.celoTransfer.edges[0].node.value, 'ether')).toFixed(2)
                        const coin = Coins[Object.entries(TransactionFeeTokenName).find(w => w[0] === tx.feeToken)![1]];
                        const coinName = coin.name;
                        const direction = tx.celoTransfer.edges[0].node.fromAddressHash.trim().toLowerCase() === storage!.accountAddress.trim().toLowerCase() ? TransactionDirection.Out : TransactionDirection.In
                        const date = dateFormat(new Date(tx.timestamp), "mediumDate")
                        const amountUSD = (currencies[coin.lowerName] ?? 0) * parseFloat(parseFloat(Web3.utils.fromWei(tx.celoTransfer.edges[0].node.value, 'ether')).toFixed(2))
                        const surplus = direction === TransactionDirection.In ? '+' : '-'
                        const type = direction === TransactionDirection.In ? TransactionType.IncomingPayment : TransactionType.QuickTransfer

                        return <TransactionItem key={generate()} hash={tx.celoTransfer.edges[0].node.transactionHash.toString()} amountCoin={`${amount} ${coinName}`} type={type} direction={direction} date={date} amountUSD={`${surplus}${amountUSD.toFixed(2)}$`} status={TransactionStatus.Complated} expand={true} />
                    }) : <div className="text-center"><ClipLoader /></div>}
                </div>
                {transactions && take < 100 && take < transactions.length && <div className="flex justify-center py-4">
                    <button className="text-primary px-5 py-3 rounded-xl border border-primary" onClick={() => {
                        if (100 - take < 4) {
                            setTake(100 - (100 - take))
                        } else {
                            setTake(take + 4 < 100 ? take + 4 : 100)
                        }
                    }}>
                        Load More
                    </button>
                </div>}
            </div>
        </div>
    </>
}

export default Transactions;