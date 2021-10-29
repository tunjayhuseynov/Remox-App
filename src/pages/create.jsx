import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import Header from '../layouts/home/header'
import Set from '../components/create/set'
import KeyPhrase from '../components/create/phrase'

const Create = () => {
    const [order, setOrder] = useState(0);
    const [data, setData] = useState();
    useEffect(() => {
        if (data) {
            setOrder(order + 1);
        }
    }, [data])
    return <div className="h-screen w-full">
        <Header />
        {order === 0 ? <Set set={setOrder} order={order} setData={setData} /> : <KeyPhrase set={setOrder} order={order} data={data} />}
    </div>
}




export default Create;