import { Dispatch } from "react";
import { CoinsNameVisual } from "../../../types/coins";
import Avatar from '../../avatar'

const Profile = ({ name, teamName, amount, coinName, walletAddress, onDeleteModal, onCurrentModal }: { name: string, amount: string, coinName: CoinsNameVisual | string, teamName: string, walletAddress: string, onDeleteModal: Dispatch<boolean>, onCurrentModal: Dispatch<boolean> }) => {

    return <>
        <div>
            <div className="text-xl font-bold pb-3">
                Personal Details
            </div>
            <div className="grid grid-cols-2 gap-y-10">
                <div className="flex flex-col space-y-3">
                    <div className="font-bold">Name</div>
                    <div>
                        <div className="flex space-x-2 items-center">
                            <Avatar name={name} />
                            <div>
                                {name}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <div className="font-bold">Team</div>
                    <div>
                        <div className="flex space-x-2 items-center">
                            <div>
                                {teamName}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <div className="font-bold">Pay Amount</div>
                    <div>
                        <div className="flex space-x-2 items-center">
                            <div>
                                {amount}
                            </div>
                            <div>
                                {coinName}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <div className="font-bold">Wallet Address</div>
                    <div>
                        <div className="flex space-x-2 items-center">
                            <div className="text-xs">
                                {walletAddress}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center pt-10">
                <div className="grid grid-cols-2 gap-y-3 gap-x-5 justify-center">
                    <div className="col-span-2">
                        <button className="bg-primary px-6 py-3 rounded-xl text-white w-full">
                            Pay Now
                        </button>
                    </div>
                    <div>
                        <button className="bg-primary w-full rounded-xl text-white px-6 py-3">
                            Edit
                        </button>
                    </div>
                    <div>
                        <button className="text-primary border border-primary w-full rounded-xl px-6 py-3" onClick={() => {
                            onDeleteModal(true)
                            onCurrentModal(false)
                        }}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Profile;