import { useState, useEffect, useContext } from 'react';
import { CoinGeckoClient } from 'coingecko-api-v3';
import SDK from '../../utility/sdk';
import { Data } from '../../App';
import { ClipLoader } from 'react-spinners';
import CoinItem from '../../components/dashboard/main/coinitem';
import TransactionHistory from '../../components/dashboard/main/transactionHistory'

const Main = () => {
    const [celo, setCelo] = useState<number>()
    const [cusd, setCUSD] = useState<number>()
    const [ceur, setCEUR] = useState<number>()

    const [percent, setPercent] = useState<number>()
    const [coin, setCoin] = useState<number>()
    const [balance, setBalance] = useState<string>()

    const [celoBalance, setCeloBalance] = useState<number>()
    const [cusdBalance, setCusdBalance] = useState<number>()
    const [ceurBalance, setCeurBalance] = useState<number>()
    const context = useContext(Data)

    const getCurrency = async (id: string) => {
        const CoinGecko = new CoinGeckoClient();

        return CoinGecko.coinIdMarketChart({ id: id, vs_currency: 'usd', days: 1 })
    }

    useEffect(() => {

        Promise.all([getCurrency("celo"), getCurrency("celo-dollar"), getCurrency("celo-euro")]).then(w => {

            const [celoData, cusdData, ceurData] = w;

            setCelo(celoData.prices[celoData.prices.length - 1][1])
            setCUSD(cusdData.prices[cusdData.prices.length - 1][1])
            setCEUR(ceurData.prices[ceurData.prices.length - 1][1])

        })

    }, [])

    useEffect(() => {
        if (celo && cusd && ceur && context && context.data && context.data.token) {
            const sdk = new SDK(context.data.token)

            sdk.getBalances().then(w => {
                setCeloBalance(parseFloat(w.celoBalance))
                setCusdBalance(parseFloat(w.cUSDBalance))
                setCeurBalance(0)
                const total = parseFloat(w.celoBalance) + parseFloat(w.cUSDBalance)
                setCoin(total)
                const result: number = (celo * parseFloat(w.celoBalance)) + (cusd * parseFloat(w.cUSDBalance))
                setBalance(result.toFixed(2))
                setPercent(0.7)
            })
        }
    }, [celo, cusd, ceur, context, context.data])
    return <main className="grid grid-cols-2 w-full gap-5">
        <div className="grid grid-cols-2 gap-8">
            <div className="col-span-2 flex flex-col">
                <div className="flex justify-between pl-4">
                    <div className="text-base text-greylish">Total Balance</div>
                    <div className="text-base text-greylish opacity-70">24h</div>
                </div>
                <div className="flex justify-between shadow-custom rounded-xl px-8 py-8">
                    <div className="text-4xl">
                        {balance || (balance !== undefined && parseFloat(balance) === 0) ? `$${balance}` : <ClipLoader />}
                    </div>
                    <div className="flex items-center text-3xl text-greylish opacity-70" style={
                        percent && percent > 0 ? { color: 'green' } : { color: 'red' }
                    }>
                        {percent ? `${percent > 0 ? '+' : '-'} ${percent}%` : <ClipLoader />}
                    </div>
                </div>
            </div>

            <div>
                <div className="flex justify-between pl-4">
                    <div className="text-base text-greylish">Money in last month</div>
                </div>
                <div className="flex justify-between shadow-custom rounded-xl px-8 py-4">
                    <div className="text-2xl text-greylish opacity-80">
                        {balance || (balance !== undefined && parseFloat(balance) === 0) ? `+ $8` : <ClipLoader />}
                    </div>
                </div>
            </div>

            <div>
                <div className="flex justify-between pl-4">
                    <div className="text-base text-greylish">Money out last month</div>
                </div>
                <div className="flex justify-between shadow-custom rounded-xl px-8 py-4">
                    <div className="ttext-greylish opacity-80 text-2xl">
                        {balance || (balance !== undefined && parseFloat(balance) === 0) ? `- $10` : <ClipLoader />}
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <div>Asset</div>
                <div>
                    {celoBalance !== undefined && cusdBalance !== undefined && coin !== undefined ? <div className="w-[200px] h-[200px] rounded-full relative" style={{
                        background: `conic-gradient(#fbce5c 0deg ${Math.floor((celoBalance * 100) / coin * 3.6)}deg, #46cd85 ${Math.floor((celoBalance * 100) / coin * 3.6)}deg ${Math.floor((celoBalance * 100) / coin * 3.6) + Math.floor((cusdBalance * 100) / coin * 3.6)}deg)`
                    }}>
                        <div className="w-[120px] h-[120px] bg-white left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                    </div> : null}
                </div>
            </div>
            {
                cusdBalance !== undefined && celo !== undefined && cusd !== undefined && ceur !== undefined && celoBalance !== undefined && ceurBalance !== undefined && coin ? <div className="flex flex-col gap-5">
                    <CoinItem title="CELO" coin={celoBalance?.toFixed(2)} usd={(celo * celoBalance).toFixed(2)} percent={((celoBalance * 100) / coin).toFixed(1)} rate="+20" img="/icons/celoicon.svg" />
                    <CoinItem title="cUSD" coin={cusdBalance?.toFixed(2)} usd={(cusd * cusdBalance).toFixed(2)} percent={((cusdBalance * 100) / coin).toFixed(1)} rate="+5" img="/icons/celodollar.svg" />
                    <CoinItem title="cEUR" coin={ceurBalance?.toFixed(2)} usd={(ceur * ceurBalance).toFixed(2)} percent={((ceurBalance * 100) / coin).toFixed(1)} rate="0" img="/icons/celoeuro.svg" />
                </div> : <ClipLoader />
            }
        </div>

        <div id="transaction" className="pr-14 pb-14">
            <TransactionHistory />
        </div>
    </main>
}

export default Main;