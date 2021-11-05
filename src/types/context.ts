import React from 'react'
import {LocalStorageData} from './localstorage/data'

export interface CustomContext{
    data : LocalStorageData | undefined, 
    setData : React.Dispatch<LocalStorageData> | undefined, 
    setUnlock : React.Dispatch<boolean> | undefined, 
    unlock : boolean 
}

export * from './localstorage/data'