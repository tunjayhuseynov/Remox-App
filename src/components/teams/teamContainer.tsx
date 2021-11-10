import { Coins } from "../../types/coins";
import { Member } from "../../types/sdk/TeamMember/getMember";
import TeamItem from "./teamItem";


const TeamContainer = ({ teamName, members }: { teamName: string, members: Member[] }) => {

    return <>
        <div className="col-span-4 font-semibold py-4 text-[1.5rem] overflow-hidden whitespace-nowrap pt-14 pb-1 px-5">
            <div>{teamName}</div>
        </div>
        {members.map(w => <>
            <div className="grid grid-cols-[20%,20%,20%,1fr] py-6 border-b border-black pb-5 px-5 text-sm">
                <TeamItem id={w.id} personName={w.name} teamName={teamName} amount={w.amount} coinUrl={Coins[w.currency].coinUrl} coinName={Coins[w.currency].name} address={w.address} />
            </div>
        </>
        )}
        {members.length > 3 ? <button className="py-3 pb-5 px-5 font-bold text-primary">
            Show More
        </button> : null}
        {!members.length ? <div className="b-5 px-5 border-b border-black pb-5">No Team Member Yet</div> : undefined}
    </>
}

export default TeamContainer;