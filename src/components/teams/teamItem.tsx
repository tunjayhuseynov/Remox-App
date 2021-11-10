import { useState } from "react";
import { CoinsNameVisual, CoinsURL } from "../../types/coins";
import Modal from "../modal";
import Profile from '../../components/teams/buttons/profile'
import Avatar from "../avatar";
import Delete from './buttons/delete'
import { useSelector } from "react-redux";
import { selectStorage } from "../../redux/reducers/storage";
import { useDeleteMemberMutation } from "../../redux/api/teamMember";

const TeamItem = ({ id, personName, teamName, amount, coinUrl, address, coinName }: { id: string, personName: string, teamName: string, amount: string, coinUrl: CoinsURL, coinName: CoinsNameVisual | string, address: string }) => {
    const storage = useSelector(selectStorage)
    const [deleteMember, {data, error, isLoading}] = useDeleteMemberMutation()
    const [modalVisible, setModalVisible] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    //const [success, setSuccess] = useState(false)


    const onDelete = async () => {

        await deleteMember(id)

    }

    return <>
        <div className="pl-[2px]">
            <div className="hover:cursor-pointer flex items-center space-x-1" onClick={() => setModalVisible(true)}>
                <Avatar name={personName} />
                <div>
                    {personName}
                </div>
            </div>
        </div>
        <div className="pl-[2px] flex items-center">
            {teamName}
        </div>
        <div className="pl-[2px] flex items-center justify-start gap-2">
            <div>
                <img src={coinUrl} alt="" />
            </div>
            <div>{amount}</div>
            <div>
                {`${coinName}`}
            </div>
        </div>
        <div className="pl-[2px] flex items-center">
            {address}
        </div>
        {modalVisible && <Modal onDisable={setModalVisible}>
            <Profile name={personName} teamName={teamName} amount={amount} coinName={coinName} walletAddress={address} onDeleteModal={setDeleteModal} onCurrentModal={setModalVisible} />
        </Modal>}
        {deleteModal && <Modal onDisable={setDeleteModal}>
            <Delete name={personName} onCurrentModal={setDeleteModal} onDelete={onDelete} />
        </Modal>}

    </>
}

export default TeamItem;