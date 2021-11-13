import { TransactionType, TransactionDirection, TransactionStatus } from "../types/dashboard/transaction"

const TransactionItem = ({ type, direction, date, amountUSD, status, amountCoin, expand = false }: { type: TransactionType, direction: TransactionDirection, date: string, amountUSD: string, amountCoin: string, status: TransactionStatus, expand?: boolean }) => {
    console.log(direction)
    return <div className={`grid ${expand ? 'grid-cols-[1fr,1fr,1fr,0.3fr] px-5' : 'grid-cols-[1.5fr,1fr,1fr]'} min-h-[115px] py-6 border-b border-black pr-10`}>
        <div className="flex space-x-5">
            <div className="flex items-center justify-center">
                <div className="bg-greylish bg-opacity-10 w-[40px] h-[40px] flex items-center justify-center rounded-full">
                    {TransactionDirection.Out === direction ? <img src="/icons/uparrow.svg" alt="" className="w-[25px] h-[25px]" /> : <img src="/icons/uparrow.svg" className="rotate-180" alt="" />}
                </div>
            </div>
            <div className="flex flex-col items-start justify-between">
                <div className="text-greylish">
                    {type === TransactionType.PaySomeone ? <span> Quick Transfer </span> : null}
                </div>
                <div className="text-sm text-greylish">
                    {date}
                </div>
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
        {expand &&
            <div className="flex flex-col justify-center cursor-pointer text-blue-400 items-end">
                View
            </div>
        }
    </div>
}

export default TransactionItem;