import { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { CoinsURL } from "../../../types/coins";
import { DropDownItem } from "../../../types/dropdown";
import SDK from "../../../utility/sdk";
import Dropdown from "../../dropdown";
import Error from "../../error";
import Success from "../../success";
import { useAppDispatch } from "../../../redux/hooks"
import { changeSuccess, changeError } from '../../../redux/reducers/notificationSlice'
import { useSelector } from "react-redux";
import { selectStorage } from "../../../redux/reducers/storage";

const AddTeams = ({ onDisable, onSuccess }: { onDisable: React.Dispatch<boolean>, onSuccess?: React.Dispatch<boolean> }) => {
    // const [selectedCoin, setSelectedCoin] = useState<DropDownItem>({ name: "Celo", coinUrl: CoinsURL.CELO })

    const storage = useSelector(selectStorage)

    const [isLoading, setLoading] = useState(false)
    const teamName = useRef<HTMLInputElement>(null)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useAppDispatch()

    const createTeam = async () => {
        setError(false)
        if (teamName.current && teamName.current.value.trim()) {
            setLoading(true)
            try {
                const sdk = new SDK(storage!.token);
                await sdk.CreateTeam({ title: teamName.current.value.trim() })
                //onSuccess(true)
                dispatch(changeSuccess(true))
                onDisable(false)
            } catch (error) {
                setError(true)
                console.error(error)
            }
            setLoading(false)
        }
    }

    return <div className="flex flex-col justify-center space-y-10">
        <div className="grid grid-cols-2 items-center">
            <div>Team Name</div>
            <div>
                <input ref={teamName} type="text" className="border pl-3 w-full rounded-xl h-10 outline-none" />
            </div>
            {error && <div className="text-red-600"> Something went wrong</div>}
        </div>
        {/* <div className="grid grid-cols-2 items-center">
            <div>Currency to be used</div>
            <div>
                <Dropdown onSelect={setSelectedCoin} price={true} selected={selectedCoin} list={[{ name: "Celo", coinUrl: CoinsURL.CELO }, { name: "cUSD", coinUrl: CoinsURL.cUSD }]} />
            </div>
        </div> */}
        <div className="flex justify-center">
            <button onClick={createTeam} className="px-14 py-2 text-white rounded-xl bg-primary font-light" disabled={isLoading}>
                {isLoading ? <ClipLoader /> : "Add Team"}
            </button>
        </div>

    </div>
}

export default AddTeams;