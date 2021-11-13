import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

interface ICurrency {
    celo?: number;
    cUsd?: number;
    cEur?: number;
}

const State: ICurrency = {

}

export const CurrencyAPI = createSlice({
    name: "currencyAPI",
    initialState: State,
    reducers: {
        updateAllCurrencies: (state: ICurrency, action) => {
            const [celo, cusd, ceur] = action.payload;
            state.celo = celo;
            state.cUsd = cusd;
            state.cEur = ceur;
        }
    }
})

export const { updateAllCurrencies } = CurrencyAPI.actions;

export const SelectCurrencies = (state: RootState) => state.currencies;
export const SelectCelo = (state: RootState) => state.currencies.celo;
export const SelectCusd = (state: RootState) => state.currencies.cUsd;
export const SelectCeur = (state: RootState) => state.currencies.cEur;

export default CurrencyAPI.reducer;