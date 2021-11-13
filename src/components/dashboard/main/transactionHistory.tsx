import { TransactionDirection, TransactionStatus, TransactionType } from "../../../types/dashboard/transaction";
import TransactionItem from "../../transactionItem";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { BlockScoutNode } from "../../../types/sdk";
import { generate } from "shortid";
import Web3 from 'web3'
import { Coins, TransactionFeeTokenName } from "../../../types/coins";
import { selectStorage } from "../../../redux/reducers/storage";
import { useAppSelector } from "../../../redux/hooks";
import { SelectCurrencies } from "../../../redux/reducers/currencies";

const TransactionHistory = ({ transactions }: { transactions: BlockScoutNode[] }) => {
    const storage = useAppSelector(selectStorage)
    const currencies = useAppSelector(SelectCurrencies)

    return <div className="flex flex-col shadow-custom max-h-full px-5 pt-5 pb-14 rounded-xl">
        <div className="flex justify-between">
            <div className="font-medium text-xl text-greylish tracking-wide">Recent Transactions</div>
            <div><Link to="/dashboard/transactions" className="text-blue-400">View All</Link></div>
        </div>
        <div className="grid grid-cols-1">
            {transactions.map((transaction, index) => {
                const tx = transaction.node;

                const amount = parseFloat(Web3.utils.fromWei(tx.celoTransfer.edges[0].node.value, 'ether')).toFixed(2)
                const coin = Coins[Object.entries(TransactionFeeTokenName).find(w => w[0] === tx.feeToken)![1]];
                const coinName = coin.name;
                const direction = tx.celoTransfer.edges[0].node.fromAddressHash.trim().toLowerCase() === storage!.accountAddress.trim().toLowerCase() ? TransactionDirection.Out : TransactionDirection.In
                const date = dateFormat(new Date(tx.timestamp), "mediumDate")
                const amountUSD = (currencies[coin.value] ?? 0) * parseFloat(parseFloat(Web3.utils.fromWei(tx.celoTransfer.edges[0].node.value, 'ether')).toFixed(2))
                const surplus = direction === TransactionDirection.In ? '+' : '-'

                return <TransactionItem key={generate()} amountCoin={`${amount} ${coinName}`} type={TransactionType.PaySomeone} direction={direction} date={date} amountUSD={`${surplus}${amountUSD.toFixed(2)}$`} status={TransactionStatus.Complated} />
            })}
        </div>
    </div>

}

export default TransactionHistory;