import { IoIosArrowDown } from 'react-icons/io'
import { Dispatch, useState } from 'react'
import { generate } from 'shortid'
import { DropDownItem } from '../types/dropdown'
import { MouseEventHandler } from 'react'
import { CoinsURL } from '../types/coins'
import { ClipLoader } from 'react-spinners'

const Li = ({ children, onClick }: { children: Array<any> | any, onClick: MouseEventHandler }) => <li onClick={onClick} className="text-left border px-3 py-2 bg-white hover:bg-gray-200 cursor-pointer">{children}</li>

const Viewer = (name: string, address?: string, coinUrl?: CoinsURL, className?: string, disableAddressDisplay = false) => <div className="flex flex-col">
    <div className="text-left flex space-x-2 items-center">
        <div><img src={coinUrl} className={coinUrl ? `w-[20px] h-[20px]` : ''} alt="" /></div>
        <div className={`${className ?? ''} font-normal`}>{name}</div>
    </div>
    {!disableAddressDisplay && <div className={`text-left text-[10px] text-gray-500`}>{!address?.startsWith('0x') ? address : address.split('').reduce((a, c, i, arr) => {
        return i < 10 || (arr.length - i) < 4 ? a + c : a.split('.').length - 1 < 6 ? a + '.' : a
    }, '')}</div>}
</div>

const Dropdown = ({ selected, list, nameActivation = false, onSelect, className, loader = false, disableAddressDisplay = false, parentClass = '' }: { disableAddressDisplay?: boolean, parentClass?: string, className?: string, selected: DropDownItem, list: Array<DropDownItem>, nameActivation?: boolean, onSelect?: Dispatch<DropDownItem>, loader?: boolean }) => {
    const [isOpen, setOpen] = useState(false)
    return (
        <div className={`relative ${parentClass}`}>
            <div onClick={() => list?.length > 0 ? setOpen(!isOpen) : null} className={`flex ${className || ''} ${loader ? 'justify-center' : 'justify-between'} items-center border rounded-xl ${isOpen && 'rounded-b-none'} py-2 px-3 cursor-pointer`}>
                {!loader ? <div>
                    {Viewer(selected.name, selected?.address ?? selected?.amount, selected?.coinUrl, selected?.className, disableAddressDisplay)}
                </div> : <ClipLoader />}
                {list && list.length > 0 && <div>
                    <IoIosArrowDown className='transition' style={isOpen ? { transform: "rotate(180deg)" } : undefined} />
                </div>}
            </div>
            {isOpen && <div className="absolute left-0 bottom-0 translate-y-full z-10 w-full overflow-hidden">
                <ul>
                    {list?.filter((w) => {
                        if (!nameActivation) {
                            return w?.address !== selected?.address
                        } else if (w.name) {
                            console.log(w.name)
                            return w?.name !== selected?.name
                        } else if (w.id) {
                            return w?.id !== selected?.id
                        }

                    })?.map(w =>
                        <Li key={generate()} onClick={() => { onSelect!(w); setOpen(false) }}>
                            {Viewer(w?.name, w?.address ?? w?.amount, w?.coinUrl, w?.className, disableAddressDisplay)}
                        </Li>)}
                </ul>
            </div>}
        </div>
    )
}

export default Dropdown;