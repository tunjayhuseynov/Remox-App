import { TransactionType, TransactionDirection, TransactionStatus } from "../types/dashboard/transaction"

const TransactionItem = ({ type, direction, date, amountUSD, status, amountCoin }: { type: TransactionType, direction: TransactionDirection, date: string, amountUSD: string, amountCoin: string, status: TransactionStatus }) => {

    return <div className="grid grid-cols-[40px,1.5fr,1fr,1fr] min-h-[115px] gap-4 py-6 border-b border-black">
        <div className="flex items-center justify-center">
            <div className="bg-greylish bg-opacity-10 w-[40px] h-[40px] flex items-center justify-center rounded-full">
                {TransactionDirection.Out === direction ? <img src="/icons/uparrow.svg" alt="" className="w-[25px] h-[25px]"/> : <img src="/icons/uparrow" className="rotate-180" alt="" />}
            </div>
        </div>
        <div className="flex flex-col items-start justify-between">
            <div className="text-greylish">
                {type === TransactionType.Quick ? <span> Quick Transfer </span> : null}
            </div>
            <div className="text-sm text-greylish">
                {date}
            </div>
        </div>
        <div className="flex flex-col justify-between items-left text-greylish">
            <div>
                {amountCoin}
            </div>
            <div className="text-sm">
                {amountUSD}
            </div>
        </div>
        <div className="flex items-center">
            {TransactionStatus.Complated === status ? <span className="text-green-400">Complated</span> : null}
        </div>
    </div>
}

export default TransactionItem;