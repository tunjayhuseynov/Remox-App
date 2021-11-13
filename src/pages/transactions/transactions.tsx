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


const Transactions = () => {
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

    return <>
        <div>
            <div className="w-full shadow-custom px-5 pt-4 pb-6 rounded-xl">
                <div id="header" className="grid grid-cols-[1fr,1fr,1fr,0.3fr] border-b border-black pb-5 px-5 pr-10" >
                    <div className="font-normal">Recent Transactions</div>
                    <div className="font-normal">Total Amount</div>
                    <div className="font-normal">Status</div>
                    <div className="font-normal place-self-end">Export</div>
                </div>
                <div>
                    {!isLoading && transactions ? transactions.slice(0, take).map((transaction, index) => {
                        const tx = transaction.node;

                        const amount = parseFloat(Web3.utils.fromWei(tx.celoTransfer.edges[0].node.value, 'ether')).toFixed(2)
                        const coin = Coins[Object.entries(TransactionFeeTokenName).find(w => w[0] === tx.feeToken)![1]];
                        const coinName = coin.name;
                        const direction = tx.celoTransfer.edges[0].node.fromAddressHash.trim().toLowerCase() === storage!.accountAddress.trim().toLowerCase() ? TransactionDirection.Out : TransactionDirection.In
                        const date = dateFormat(new Date(tx.timestamp), "mediumDate")
                        const amountUSD = (currencies[coin.value] ?? 0) * parseFloat(parseFloat(Web3.utils.fromWei(tx.celoTransfer.edges[0].node.value, 'ether')).toFixed(2))
                        const surplus = direction === TransactionDirection.In ? '+' : '-'

                        return <TransactionItem key={generate()} amountCoin={`${amount} ${coinName}`} type={TransactionType.PaySomeone} direction={direction} date={date} amountUSD={`${surplus}${amountUSD.toFixed(2)}$`} status={TransactionStatus.Complated} expand={true} />
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