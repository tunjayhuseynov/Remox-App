import { useState } from 'react';
import TeamContainer from '../../components/teams/teamContainer'
import Modal from '../../components/modal'
import AddTeams from '../../components/teams/buttons/addTeam'

const Teams = () => {
    const [modal, setModal] = useState(false)
    return <div>
        <div className="flex justify-between pb-5">
            <div className="grid grid-cols-3 gap-10">
                <button className="bg-primary px-6 py-2 rounded-xl text-white" onClick={() => setModal(true)}>Add Team</button>
                <button className="bg-primary px-6 py-2 rounded-xl text-white">Add Person</button>
                <button className="border border-primary text-primary rounded-xl px-6 py">All Teams</button>
            </div>
            <button className="px-5 py-2 bg-greylish bg-opacity-5 rounded-xl">
                Export
            </button>
        </div>
        <div className="w-full shadow-custom px-5 pt-4 pb-6 rounded-xl">
            <div id="header" className="grid grid-cols-[20%,20%,20%,1fr] border-b border-black pb-5 px-5" >
                <div className="font-normal">Name</div>
                <div className="font-normal">Team</div>
                <div className="font-normal">Amount</div>
                <div className="font-normal">Wallet Address</div>
            </div>
            <div>
                <TeamContainer teamName="Remox" />
                <TeamContainer teamName="Remox" />
            </div>
        </div>
        {modal &&
            <Modal onDisable={setModal}>
                <AddTeams/>
            </Modal>}
    </div>
}

export default Teams;