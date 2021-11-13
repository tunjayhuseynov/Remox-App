import { Dispatch, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useAddMemberMutation, useGetMemberQuery, useGetTeamsQuery } from "../../../redux/api";
import { Coins, CoinsName, CoinsURL } from "../../../types/coins";
import { DropDownItem } from "../../../types/dropdown";
import { Member } from "../../../types/sdk";
import Dropdown from "../../dropdown";


const EditMember = (props: Member & { onCurrentModal: Dispatch<boolean> }) => {

    const { data, error, isLoading } = useGetTeamsQuery({ take: Number.MAX_SAFE_INTEGER })

    const { data: member, isLoading: memberLoading } = useGetMemberQuery(props.id)

    const [selected, setSelected] = useState<DropDownItem>({ name: "No Team", coinUrl: CoinsURL.None })
    const [selectedWallet, setSelectedWallet] = useState<DropDownItem>(Coins[CoinsName.CELO]);

    useEffect(() => {
        if (member) {
            console.log(member)
            setSelected({ name: member.name, coinUrl: CoinsURL.None })
        }
    }, [member])

    return <>
        <div>
            {!memberLoading && member ? <>
                <div className="text-xl font-bold pb-3">
                    Personal Details
                </div>
                <div className="grid grid-cols-2 gap-y-10">
                    <div className="flex flex-col space-y-3">
                        <div className="font-bold">Name</div>
                        <div>
                            <div className="flex space-x-2 items-center">
                                <div>
                                    <input name="name" type="text" value={member!.name} className="w-full border-2 border-black border-opacity-50 outline-none rounded-xl px-3 py-2" required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <div className="font-bold">Team</div>
                        <div>
                            <div className="flex space-x-2 items-center">
                                <div>
                                    <Dropdown onSelect={setSelected} loader={isLoading} selected={selected} list={data?.teams && data.teams.length > 0 ? [...data.teams.map(w => { return { name: w.title, coinUrl: CoinsURL.None, id: w.id } })] : []} nameActivation={true} className="border-2 rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <div className="font-bold">Pay Amount</div>
                        <div>
                            <div className="flex space-x-2 items-center">
                                <div>
                                    {member!.amount}
                                </div>
                                <div>
                                    {member!.currency}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <div className="font-bold">Wallet Address</div>
                        <div>
                            <div className="flex space-x-2 items-center">
                                <div className="text-xs">
                                    {member!.address}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center pt-10">
                    <div className="flex justify-center">
                        <div>
                            <button className="bg-primary w-full rounded-xl text-white px-6 py-3">
                                Save
                            </button>
                        </div>
                    </div>
                </div> </>
                : <div className="flex justify-center"> <ClipLoader /></div>}
        </div>
    </>
}

export default EditMember;