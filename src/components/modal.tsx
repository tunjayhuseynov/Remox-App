import React, { useEffect } from "react";


const Modal = ({ children, onDisable }: { children?: JSX.Element | JSX.Element[], onDisable: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return <div className="w-full h-full bg-white bg-opacity-60 absolute left-0 top-0" onClick={()=>onDisable(false)}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white min-w-[33%] min-h-[25%] shadow-custom rounded-xl">
            {children}
        </div>
    </div>
}

export default Modal;