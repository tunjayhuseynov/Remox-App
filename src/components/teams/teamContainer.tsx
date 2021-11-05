import { CoinsName, CoinsNameVisual, CoinsURL } from "../../types/coins";
import TeamItem from "./teamItem";


const TeamContainer = ({ teamName }: { teamName: string }) => {

    return <>
        <div className="col-span-4 font-semibold py-4 text-[1.5rem] overflow-hidden whitespace-nowrap pt-3 pb-1 px-5">
            <td>{teamName}</td>
        </div>
        <div className="grid grid-cols-[20%,20%,20%,1fr] py-6 border-b border-black pb-5 px-5 text-sm">
            <TeamItem personName="Tuncay" teamName="Remox" amount={500} coinUrl={CoinsURL.CELO} coinName={CoinsNameVisual.CELO} address="0x0fd545769A02ee82Fbf6C549B7865C893daEe3E4" />
        </div>
        <div className="grid grid-cols-[20%,20%,20%,1fr] py-6 border-b border-black pb-5 px-5 text-sm">
            <TeamItem personName="Tuncay" teamName="Remox" amount={500} coinUrl={CoinsURL.CELO} coinName={CoinsNameVisual.CELO} address="0x0fd545769A02ee82Fbf6C549B7865C893daEe3E4" />
        </div>
        <div className="grid grid-cols-[20%,20%,20%,1fr] py-6 pb-5 px-5 text-sm">
            <TeamItem personName="Tuncay" teamName="Remox" amount={500} coinUrl={CoinsURL.CELO} coinName={CoinsNameVisual.CELO} address="0x0fd545769A02ee82Fbf6C549B7865C893daEe3E4" />
        </div>
        <button className="py-3 pb-5 px-5 font-bold text-primary">
            Show More
        </button>
    </>
}

export default TeamContainer;