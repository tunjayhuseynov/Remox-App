import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Coins, CoinsName, CoinsURL } from "../../../types/coins";
import { DropDownItem } from "../../../types/dropdown";
import { TeamInfo } from "../../../types/sdk/Team/GetTeams";
import SDK from "../../../utility/sdk";
import Dropdown from "../../dropdown";
import { ClipLoader } from "react-spinners";
import { useAppDispatch } from "../../../redux/hooks"
import { changeSuccess, changeError } from '../../../redux/reducers/notificationSlice'
import { useSelector } from "react-redux";
import { selectStorage } from "../../../redux/reducers/storage";
import { useGetTeamsQuery } from "../../../redux/api/team";


const AddMember = ({ list, onDisable, onSuccess }: { list?: TeamInfo[], onDisable: React.Dispatch<boolean>, onSuccess?: React.Dispatch<boolean> }) => {

    const {data} = useGetTeamsQuery({})

    const storage = useSelector(selectStorage)


    const [selected, setSelected] = useState<DropDownItem>(list && list.length > 0 ? { name: "Select Team", coinUrl: CoinsURL.None } : { name: "No Team", coinUrl: CoinsURL.None })
    const [selectedWallet, setSelectedWallet] = useState<DropDownItem>(Coins[CoinsName.CELO]);
    const [isLoader, setLoader] = useState(false)
    const [isError, setError] = useState(false)

    const [listMember, setListMember] = useState(list)
    const [listLoader, setListLoader] = useState(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (listMember && listMember.length > 0) {
            setSelected({ name: "Select Team", coinUrl: CoinsURL.None })
        }
    }, [listMember])

    useEffect(() => {
        if (!list) {
            console.log("Done")
            setError(false)
            const sdk = new SDK(storage!.token)

            setListLoader(true)
            sdk.GetTeams({ take: Number.MAX_SAFE_INTEGER }).then(w => {
                setListMember(w.teams)
                setListLoader(false)
            }).catch(w => {
                console.error(w)
                setListLoader(false)
            })
        }
    }, [])

    const Submit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoader(true)

        setError(false)
        const sdk = new SDK(storage!.token)

        const target = e.target as HTMLFormElement;

        const { firstName, lastName, teamName, walletAddress, amount } = target;
        const firstNameValue = (firstName as HTMLInputElement).value
        const lastNameValue = (lastName as HTMLInputElement).value
        // const teamNameValue = (teamName as HTMLInputElement)?.value
        const walletAddressValue = (walletAddress as HTMLInputElement).value
        const amountValue = (amount as HTMLInputElement).value


        if (firstNameValue && lastNameValue && walletAddressValue && amountValue) {
            if (!Object.values(Coins).includes(selectedWallet as { name: string, coinUrl: CoinsURL, value: CoinsName })) {
                alert("Please, choose a wallet")
                return
            }
            if (selected === { name: "Select Team", coinUrl: CoinsURL.None }) {
                alert("Please, choose a team")
                return
            }

            if (selectedWallet.value && selected.id) {
                try {
                    await sdk.AddMember({
                        name: `${firstNameValue} ${lastNameValue}`,
                        address: walletAddressValue.trim(),
                        currency: selectedWallet.value,
                        amount: amountValue.trim(),
                        teamId: selected.id
                    })
                    //onSuccess(true)
                    dispatch(changeSuccess(true))
                    onDisable(false)
                    return
                } catch (error) {
                    console.error(error)
                    setError(true)
                }
            }

            setLoader(false)
        }
    }

    return <>
        <form onSubmit={Submit}>
            <div className="flex flex-col space-y-8">
                <div className="flex flex-col space-y-4">
                    <div className="font-bold">Personal Details</div>
                    <div className="grid grid-cols-2 gap-x-10">
                        <div>
                            <input type="text" name="firstName" placeholder="First Name" className="border-2 pl-2 rounded-md outline-none h-[42px] w-full" required />
                        </div>
                        <div>
                            <input type="text" name="lastName" placeholder="Last Name" className="border-2 pl-2 rounded-md outline-none h-[42px] w-full" required />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="font-bold">Choose Team</div>
                    <div className="grid grid-cols-2 w-[85%] gap-x-10">
                        <div>
                            <Dropdown onSelect={setSelected} loader={listLoader} selected={selected} list={listMember && listMember.length > 0 ? [...listMember.map(w => { return { name: w.title, coinUrl: CoinsURL.None, id: w.id } })] : []} nameActivation={true} className="border-2 rounded-md" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="font-bold">Wallet Address</div>
                    <div>
                        <input type="text" name="walletAddress" className="h-[42px] w-full rounded-lg border-2 pl-2 outline-none" placeholder="Wallet Address" required />
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="font-bold">Currency and Amount</div>
                    <div className="grid grid-cols-2 w-[85%] gap-x-10">
                        <div>
                            <input type="number" name="amount" className="h-[42px] border-2 outline-none pl-4 rounded-md pr-4 w-full" placeholder="Amount" step="any" required />
                        </div>
                        <div>
                            {selectedWallet && <Dropdown className="rounded-md w-full" onSelect={setSelectedWallet} nameActivation={true} selected={selectedWallet} list={Object.values(Coins)} />}
                        </div>
                    </div>
                </div>
                {isError && <div className="flex flex-col space-y-4 justify-center">
                    <div className="text-red-500">Something went wrong</div>
                </div>}
                <div className="flex justify-center">
                    <button className="px-8 py-3 bg-primary rounded-xl text-white">
                        {isLoader ? <ClipLoader /> : "Add Person"}
                    </button>
                </div>
            </div>
        </form>
    </>
}

export default AddMember;