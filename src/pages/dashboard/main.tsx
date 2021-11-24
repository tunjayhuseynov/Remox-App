import { useState, useEffect, useContext, useMemo } from 'react';
import { CoinGeckoClient, CoinMarketChartResponse } from 'coingecko-api-v3';
import { ClipLoader } from 'react-spinners';
import CoinItem from '../../components/dashboard/main/coinitem';
import TransactionHistory from '../../components/dashboard/main/transactionHistory'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import storage, { selectStorage } from '../../redux/reducers/storage';
import { useGetBalanceQuery, useGetTransactionsQuery } from '../../redux/api';
import { SelectCelo, SelectCeur, SelectCurrencies, SelectCusd, updateAllCurrencies } from '../../redux/reducers/currencies';
import { AltCoins, Coins } from '../../types/coins';
import { generate } from 'shortid';

interface Balance {
    amount: number,
    percent: number,
    coins: AltCoins,
    reduxValue: number | undefined
}

const Main = () => {
    const dispatch = useAppDispatch()
    const storage = useAppSelector(selectStorage)
    const { data, error, isLoading } = useGetBalanceQuery()

    const { data: transactions, error: transactionError, } = useGetTransactionsQuery(storage!.accountAddress)

    const celo = (useAppSelector(SelectCurrencies)).CELO
    const cusd = (useAppSelector(SelectCurrencies)).cUSD
    const ceur = (useAppSelector(SelectCurrencies)).cEUR
    const ube = (useAppSelector(SelectCurrencies)).UBE
    const moo = (useAppSelector(SelectCurrencies)).MOO
    const mobi = (useAppSelector(SelectCurrencies)).MOBI
    const poof = (useAppSelector(SelectCurrencies)).POOF

    const [percent, setPercent] = useState<number>()
    const [coin, setCoin] = useState<number>()
    const [balance, setBalance] = useState<string>()

    const [celoBalance, setCeloBalance] = useState<Balance>()
    const [cusdBalance, setCusdBalance] = useState<Balance>()
    const [ceurBalance, setCeurBalance] = useState<Balance>()
    const [ubeBalance, setUbeBalance] = useState<Balance>()
    const [mooBalance, setMooBalance] = useState<Balance>()
    const [mobiBalance, setMobiBalance] = useState<Balance>()
    const [poofBalance, setPoofBalance] = useState<Balance>()

    const [allInOne, setAllInOne] = useState<Balance[]>()

    const all = useMemo(() => {
        if (celoBalance !== undefined && cusdBalance !== undefined && ceurBalance !== undefined && ubeBalance !== undefined && mooBalance !== undefined && mobiBalance !== undefined && poofBalance !== undefined && coin !== undefined) {
            return {
                celo: celoBalance,
                cUSD: cusdBalance,
                cEUR: ceurBalance,
                UBE: ubeBalance,
                MOO: mooBalance,
                MOBI: mobiBalance,
                POOF: poofBalance
            }
        }
    }, [celoBalance, cusdBalance, ceurBalance, ubeBalance, mooBalance, mobiBalance, poofBalance])

    const chart = useMemo(() => {
        if (celoBalance !== undefined && cusdBalance !== undefined && ceurBalance !== undefined && ubeBalance !== undefined && mooBalance !== undefined && mobiBalance !== undefined && poofBalance !== undefined && coin !== undefined) {
            const celoDeg = Math.floor((celoBalance.amount * 100) / coin * 3.6)
            const cusdDeg = Math.floor((cusdBalance.amount * 100) / coin * 3.6) + celoDeg;
            const ceurDeg = Math.floor((ceurBalance.amount * 100) / coin * 3.6) + cusdDeg;
            const ubeDeg = Math.floor((ubeBalance.amount * 100) / coin * 3.6) + ceurDeg;
            const mooDeg = Math.floor((mooBalance.amount * 100) / coin * 3.6) + ubeDeg;
            const mobiDeg = Math.floor((mobiBalance.amount * 100) / coin * 3.6) + mooDeg;
            const poofDeg = Math.floor((poofBalance.amount * 100) / coin * 3.6) + mobiDeg;

            return `conic-gradient(#fbce5c 0deg ${celoDeg}deg, #46cd85 ${celoDeg}deg ${cusdDeg}deg, #040404 ${cusdDeg}deg ${ceurDeg}deg, #6D619A ${ceurDeg}deg ${ubeDeg}deg, #3288ec ${ubeDeg}deg ${mooDeg}deg, #b0d2fc ${mooDeg}deg ${mobiDeg}deg, #7D72FC ${mobiDeg}deg ${poofDeg}deg)`
        }
    }, [celoBalance, cusdBalance, ceurBalance, ubeBalance, mooBalance, mobiBalance, poofBalance, coin, celo, cusd, ceur, ube, moo, mobi, poof])

    const getCurrency = (id: string, { signal }: { signal?: AbortSignal } = {}): Promise<CoinMarketChartResponse> => {
        const CoinGecko = new CoinGeckoClient();

        return new Promise(async (resolve, reject) => {
            CoinGecko.coinIdMarketChart({ id: id, vs_currency: 'usd', days: 1 }).then(w => resolve(w)).catch(e => reject(e))

            signal?.addEventListener("abort", () => {
                reject("Aborted")
            })
        })
    }


    useEffect(() => {
        const controller = new AbortController()
        Promise.all(
            [
                getCurrency("celo", { signal: controller.signal }),
                getCurrency("celo-dollar", { signal: controller.signal }),
                getCurrency("celo-euro", { signal: controller.signal }),
                getCurrency("ubeswap", { signal: controller.signal }),
                getCurrency("moola-market", { signal: controller.signal }),
                getCurrency("mobius", { signal: controller.signal }),
                getCurrency("poofcash", { signal: controller.signal }),
            ]).then(w => {

                const [celoData, cusdData, ceurData, ubeData, mooData, mobiData, poofData] = w;

                dispatch(updateAllCurrencies([
                    celoData.prices[celoData.prices.length - 1][1],
                    cusdData.prices[cusdData.prices.length - 1][1],
                    ceurData.prices[ceurData.prices.length - 1][1],
                    ubeData.prices[ubeData.prices.length - 1][1],
                    mooData.prices[mooData.prices.length - 1][1],
                    mobiData.prices[mobiData.prices.length - 1][1],
                    poofData.prices[poofData.prices.length - 1][1],
                ]))

            }).catch(e => console.error(e))

        return () => {
            controller.abort();
        }

    }, [])

    useEffect(() => {
        if (celo && cusd && ceur && ube && moo && mobi && poof && storage && storage.token && data) {

            const total = Object.values(data).reduce((a, b) => a + parseFloat(b), 0)
            setCoin(total)
            const result: number = (celo * parseFloat(data.celoBalance)) + (cusd * parseFloat(data.cUSDBalance))
            setBalance(result.toFixed(2))
            setPercent(0.7)

            const pCelo = parseFloat(data.celoBalance);
            const pCusd = parseFloat(data.cUSDBalance);
            const pCeur = parseFloat(data.cEURBalance);
            const pUbe = parseFloat(data.UBE);
            const pMoo = parseFloat(data.MOO);
            const pMobi = parseFloat(data.MOBI);
            const pPoof = parseFloat(data.POOF);

            setCeloBalance({ amount: pCelo, percent: (pCelo * 100) / total, coins: Coins.celo, reduxValue: celo })
            setCusdBalance({ amount: pCusd, percent: (pCusd * 100) / total, coins: Coins.cUSD, reduxValue: cusd })
            setCeurBalance({ amount: pCeur, percent: (pCeur * 100) / total, coins: Coins.cEUR, reduxValue: ceur })
            setUbeBalance({ amount: pUbe, percent: (pUbe * 100) / total, coins: Coins.UBE, reduxValue: ube })
            setMooBalance({ amount: pMoo, percent: (pMoo * 100) / total, coins: Coins.MOO, reduxValue: moo })
            setMobiBalance({ amount: pMobi, percent: (pMobi * 100) / total, coins: Coins.MOBI, reduxValue: mobi })
            setPoofBalance({ amount: pPoof, percent: (pPoof * 100) / total, coins: Coins.POOF, reduxValue: poof })
        }
        if (error) console.error(error)
    }, [celo, cusd, ceur, ube, moo, mobi, poof, storage, data, error])


    useEffect(() => {
        if (all) {
            setAllInOne(Object.values(all).sort((a, b) => b.percent.toLocaleString().localeCompare(a.percent.toLocaleString())).slice(0, 4))
        }
    }, [all])

    return <main className="grid grid-cols-1 xl:grid-cols-2 w-full gap-5">
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
                        background: chart
                    }}>
                        <div className="w-[120px] h-[120px] bg-white left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                    </div> : null}
                </div>
            </div>
            {
                allInOne !== undefined ?
                    <div className="flex flex-col gap-5 overflow-hidden">
                        {allInOne.map((item, index) => {
                            return <CoinItem key={generate()} title={item.coins.name} coin={item.amount.toFixed(2)} usd={((item.reduxValue ?? 0) * item.amount).toFixed(2)} percent={(item.percent).toFixed(1)} rate="+20" img={item.coins.coinUrl} />
                        })}
                    </div> : <ClipLoader />
            }
        </div>

        <div id="transaction" className="pb-14">
            {transactions ? <TransactionHistory transactions={transactions.result.slice(0, 4)} /> : <div className="flex justify-center"> <ClipLoader /></div>}
        </div>
    </main>
}

export default Main;