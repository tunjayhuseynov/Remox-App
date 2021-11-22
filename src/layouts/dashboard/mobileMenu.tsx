

const MobileMenu = ({children} : {children: JSX.Element | JSX.Element[] | string}) =>{

    return <div className="w-[35vw] absolute -translate-x-50 h-full bg-white z-50 border-r-2">
        <div className="h-full flex flex-col items-center justify-center">
            {children}
        </div>
    </div>
}

export default MobileMenu