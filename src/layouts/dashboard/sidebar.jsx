import Dropdown from "../../components/dropdown";
import Siderbarlist from '../../components/dashboard/siderbarlist'

const Sidebar = () => {

    return <div className="flex flex-col gap-14 pl-10">


        {/* <div>
            <Dropdown selected={{ name: "Remox", address: "0x0fd545769A02ee82Fbf6C549B7865C893daEe3E4" }} />
        </div> */}
        <div className="pl-4">
            <Siderbarlist>

            </Siderbarlist>
        </div>

    </div>

}

export default Sidebar;