import { CoinsNameVisual, CoinsURL } from "../../types/coins";

const TeamItem = ({ personName, teamName, amount, coinUrl, address, coinName }: { personName: string, teamName: string, amount: number, coinUrl: CoinsURL, coinName: CoinsNameVisual, address: string }) => {

    return <>
        <div className="pl-[2px]">
            <div>{personName}</div>
        </div>
        <div className="pl-[2px]">
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
        <div className="pl-[2px]">
            {address}
        </div>
    </>
}

export default TeamItem;