import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IStorage {
    accountAddress: string,
    encryptedPhrase: string,
    token: string,
    userName?: string;
    surname?: string,
    companyName?: string,
}

const initialState = (): IStorage | undefined => {
    const val = localStorage.getItem("user")

    if (val) {
        const data: IStorage = JSON.parse(val)
        return data;
    }
}


export const storageSlice = createSlice({
    name: "storage",
    initialState: initialState(),
    reducers: {
        setStorage: (state, action) => {
            localStorage.setItem("user", action.payload)
            state = JSON.parse(action.payload)
        }
    }
})

export const { setStorage } = storageSlice.actions

export const selectStorage = (state: RootState) => state.storage

export default storageSlice.reducer