import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs'
import { useState, useEffect, useCallback, useRef, useContext } from 'react'
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { Data } from '../../App';


const Navbar = () => {
    const data = useContext(Data)

    return <div className="grid grid-cols-5 gap-12">
        <div className="h-[50px] flex items-center pl-14">
            <img src="/logo.png" alt="" width="150" />
        </div>
        <div className="search col-span-2">
            <div className="w-full h-12 shadow backdrop-blur bg-gray-50 rounded-lg flex items-center pl-3 gap-3">
                <BsSearch />
                <input type="text" placeholder={'Search'} className="flex-grow bg-transparent outline-none" />
            </div>
        </div>
        <div className="actions flex items-center justify-evenly col-span-2">
            {data.data ? <Visitcard name="Remox" address={data.data.accountAddress} /> : <ClipLoader />}
            <NavbarDropdown />
            <IoMdNotificationsOutline className="text-2xl" />
        </div>
    </div>
}

const Visitcard = ({ name, address }) => <div className="px-5 py-1 flex flex-col bg-gray-50 rounded-xl">
    <h3 className="text-xl">{name}</h3>
    <p className="text-xs">{address.split('').reduce((a, c, i, arr) => {
        return i < 10 || (arr.length - i) < 4 ? a + c : a.split('.').length - 1 < 6 ? a + '.' : a
    }, '')}</p>
</div>

const Li = ({ children }) => <li className="flex gap-2 text-left border px-3 py-2 bg-white hover:text-primary hover:border-b-primary cursor-pointer first:rounded-t-xl last:rounded-b-xl">{children}</li>

const NavbarDropdown = () => {
    const [isOpen, setOpen] = useState(false)
    const divRef = useRef(null)
    const click = useCallback((e) => {
        if (isOpen && divRef.current && !divRef.current.contains(e.target)) {
            setOpen(false)
        }
    }, [isOpen])

    useEffect(() => {
        window.addEventListener('click', click)

        return () => window.removeEventListener('click', click)
    }, [click, divRef])

    return <div className="relative">
        <button onClick={() => setOpen(!isOpen)} className="bg-primary text-white px-6 py-3 rounded-xl">
            Move Crypto
        </button>
        {isOpen && <div ref={divRef} className="absolute w-[150%] rounded-2xl -left-1/4  -bottom-1 translate-y-full shadow-xl">
            <ul>
                <Link to="/dashboard/pay"><Li><PaySVG /> Pay Someone</Li></Link>
                <Li><MassPayoutSVG />Mass Payout</Li>
                <Li><RequestMoneySVG /> Request Money</Li>
                <Li><FundSVG /> Add Funds</Li>
            </ul>
        </div>}
    </div>
}

const PaySVG = () => <img src='/icons/senticon.svg' alt="" />

const MassPayoutSVG = () => <img src='/icons/masspayouticon.svg' alt="" />

const RequestMoneySVG = () => <img src='/icons/moneyrequesticon.svg' alt="" />

const FundSVG = () => <img src='/icons/addfundds.svg' alt="" />

export default Navbar;