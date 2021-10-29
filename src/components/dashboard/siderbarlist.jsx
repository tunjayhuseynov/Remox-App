
const Li = ({ children }) => <li className="mb-6 text-left font-light text-lg flex gap-3">{children}</li>
const Sidebarlist = () => {

    return <>
        <ul>
            <Li><DashboardSVG />Dashboard</Li>
            <Li><PayrollSVG/>Run Payroll</Li>
            <Li><TransactionsSVG/>Transactions</Li>
            <Li><SwapSVG/>Swap</Li>
            <Li><AssetsSVG/>Assets</Li>
            <Li><TeamsSVG/>Teams</Li>
            <Li><SettingSVG/> Settings</Li>
        </ul>
    </>
}

const DashboardSVG = () => <img src='/icons/dashboardicon.svg' alt='Dashboard'/>

const PayrollSVG = () => <img src='/icons/runpayrollicon.svg' alt="Payroll"/>

const TransactionsSVG = () => <img src='/icons/Transactionsicon.svg' alt="Transaction" />

const SwapSVG = () => <img src='/icons/swap.svg' alt="Swap" />

const AssetsSVG = () => <img src='/icons/stocksicon.svg' alt="Asset" />

const TeamsSVG = () => <img src='/icons/teamlogo.svg' alt="Teams" />

const SettingSVG = () => <img src='/icons/settings.svg' alt="" />

export default Sidebarlist;