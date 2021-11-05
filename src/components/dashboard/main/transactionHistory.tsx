import { TransactionDirection, TransactionStatus, TransactionType } from "../../../types/dashboard/transaction";
import TransactionItem from "../../transactionItem";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";


const TransactionHistory = () => {

    return <div className="flex flex-col shadow-custom max-h-full px-5 pt-5 pb-14 rounded-xl">
        <div className="flex justify-between">
            <div className="font-medium text-xl text-greylish tracking-wide">Recent Transactions</div>
            <div><Link to="/dashboard/transactions" className="text-blue-400">View All</Link></div>
        </div>
        <div className="max-h-[450px] flex flex-col">
            <TransactionItem amountCoin={"400 CELO"} type={TransactionType.Quick} direction={TransactionDirection.Out} date={dateFormat(new Date(), "mediumDate")} amountUSD={"-$100"} status={TransactionStatus.Complated} />
            <TransactionItem amountCoin={"400 CELO"} type={TransactionType.Quick} direction={TransactionDirection.Out} date={dateFormat(new Date(), "mediumDate")} amountUSD={"-$100"} status={TransactionStatus.Complated} />
            <TransactionItem amountCoin={"400 CELO"} type={TransactionType.Quick} direction={TransactionDirection.Out} date={dateFormat(new Date(), "mediumDate")} amountUSD={"-$100"} status={TransactionStatus.Complated} />
            <TransactionItem amountCoin={"400 CELO"} type={TransactionType.Quick} direction={TransactionDirection.Out} date={dateFormat(new Date(), "mediumDate")} amountUSD={"-$100"} status={TransactionStatus.Complated} />
        </div>
    </div>

}

export default TransactionHistory;