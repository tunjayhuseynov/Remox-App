import Navbar from '../../layouts/dashboard/navbar'
import Sidebar from '../../layouts/dashboard/sidebar';


const Dashboard = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    return <div className="flex flex-col pt-6 gap-16">
        <Navbar></Navbar>
        <div className="grid grid-cols-11 gap-12">
            <div className="col-span-2"><Sidebar></Sidebar></div>
            <div className="col-span-8 pl-7 pr-2">
                {children}
            </div>
        </div>
    </div>
}

export default Dashboard;