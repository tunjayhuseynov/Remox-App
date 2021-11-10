import { Fragment, useEffect, useState, useRef } from 'react';
import TeamContainer from '../../components/teams/teamContainer'
import Modal from '../../components/modal'
import AddTeams from '../../components/teams/buttons/addTeam'
import AddMember from '../../components/teams/buttons/addMember'
import SDK from '../../utility/sdk'
import { ClipLoader } from 'react-spinners';
import { TeamInfo } from '../../types/sdk/Team/GetTeams';
import { generate } from 'shortid';
import Success from '../../components/success';

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { changeError, changeSuccess, selectError, selectSuccess } from '../../redux/reducers/notificationSlice'
import Error from '../../components/error';
import { useSelector } from 'react-redux';
import { selectStorage } from '../../redux/reducers/storage';


const Teams = () => {

    const storage = useSelector(selectStorage)


    const isSuccess = useAppSelector(selectSuccess)
    const isError = useAppSelector(selectError)
    const dispatch = useAppDispatch()

    const [addTeamModal, setAddTeamModal] = useState(false)
    const [addMemberModal, setAddMemberModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [teams, setTeams] = useState<TeamInfo[]>([])


    const [teamCount] = useState(3)
    const [skipCount, setSkipCount] = useState(0)


    const maxTeamCount = useRef(0)

    useEffect(() => {
        (async () => {

            setLoading(true)
            try {
                const sdk = new SDK(storage!.token);
                const res = await sdk.GetTeams({ take: teamCount, skip: skipCount })

                const idList = res.teams.map(w => sdk.GetMembers(w.id, { take: 3 }))

                const allRes = await Promise.all(idList)
                maxTeamCount.current = res.total;
                setTeams([...teams, ...res.teams.map((w, i): TeamInfo => { return { ...w, members: allRes[i].members } })])

            } catch (error) {
                console.error(error)
                setLoading(false)
            }

        })()
    }, [teamCount, skipCount])

    useEffect(() => {
        (async () => {
            if (isSuccess) {

                setLoading(true)
                try {
                    const sdk = new SDK(storage!.token);
                    const res = await sdk.GetTeams({ take: teams.length, skip: 0 })

                    const idList = res.teams.map(w => sdk.GetMembers(w.id, { take: 3 }))
                    const allRes = await Promise.all(idList)
                    maxTeamCount.current = res.total;
                    setTeams(res.teams.map((w, i): TeamInfo => { return { ...w, members: allRes[i].members } }))
                } catch (error) {
                    console.error(error)
                    setLoading(false)
                }

            }
        })()
    }, [isSuccess])

    useEffect(() => {
        if (teams.length > 0) {
            setLoading(false)
        }
    }, [teams])

    return <div>
        <div className="flex justify-between pb-5">
            <div className="grid grid-cols-3 gap-10">
                <button className="bg-primary px-6 py-2 rounded-xl text-white" onClick={() => setAddTeamModal(true)}>Add Team</button>
                <button className="bg-primary px-6 py-2 rounded-xl text-white" onClick={() => setAddMemberModal(true)}>Add Person</button>
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
                {teams.map(w => w && w.members && w.members.length > 0 ? <Fragment key={generate()}><TeamContainer teamName={w.title} members={w.members} /></Fragment> : undefined)}
                {teams.map(w => w && w.members && w.members.length === 0 ? <Fragment key={generate()}><TeamContainer teamName={w.title} members={w.members} /></Fragment> : undefined)}

                {isLoading && <div className="flex justify-center py-10"><ClipLoader /></div>}
            </div>
        </div>
        {teams.length < maxTeamCount.current && <div className="flex justify-center py-4">
            <button className="text-primary px-5 py-3 rounded-xl border border-primary" onClick={() => {
                if (maxTeamCount.current - teams.length < teamCount) {
                    setSkipCount(maxTeamCount.current - (maxTeamCount.current - teams.length))
                } else {
                    setSkipCount(teams.length)
                }
            }}>
                Load More
            </button>
        </div>}
        {addTeamModal &&
            <Modal onDisable={setAddTeamModal}>
                <AddTeams onDisable={setAddTeamModal} />
            </Modal>}
        {addMemberModal &&
            <Modal onDisable={setAddMemberModal}>
                <AddMember onDisable={setAddMemberModal} />
            </Modal>}
        {isSuccess && <Success onClose={(val: boolean) => dispatch(changeSuccess(val))} text="Successfully" />}
        {isError && <Error onClose={(val: boolean) => dispatch(changeError(val))} />}
    </div>
}

export default Teams;