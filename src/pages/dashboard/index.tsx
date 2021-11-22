import Navbar from '../../layouts/dashboard/navbar'
import Sidebar from '../../layouts/dashboard/sidebar';
import MobileMenu from '../../layouts/dashboard/mobileMenu'
import Siderbarlist from '../../components/dashboard/sidebarlist'
import { useAppSelector } from '../../redux/hooks';
import { selectToggle } from '../../redux/reducers/toggles';

const Dashboard = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const toggle = useAppSelector(selectToggle)

    return <>
        {toggle.mobileMenu &&
            <MobileMenu>
                <Siderbarlist />
            </MobileMenu>
        }
        <div className="flex flex-col pt-6 gap-16">

            <Navbar></Navbar>
            <div className="grid grid-cols-11 gap-12">
                <div className="hidden md:block md:col-span-2"><Sidebar /></div>
                <div className="col-span-11 md:col-span-8 pl-2 md:pl-7 pr-2">
                    {children}
                </div>
            </div>
        </div>
    </>
}

export default Dashboard;