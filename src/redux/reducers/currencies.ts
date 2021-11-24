import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ICurrency {
	CELO?: number;
	cUSD?: number;
	cEUR?: number;
	UBE?: number;
	MOO?: number;
	MOBI?: number;
	POOF?: number;
}

const State: ICurrency = {};

export const CurrencyAPI = createSlice({
	name: 'currencyAPI',
	initialState: State,
	reducers: {
		updateAllCurrencies: (state: ICurrency, action) => {
			const [ celo, cusd, ceur, ube, moo, mobi, poof ] = action.payload;
			state.CELO = celo;
			state.cUSD = cusd;
			state.cEUR = ceur;
			state.UBE = ube;
			state.MOO = moo;
			state.MOBI = mobi;
			state.POOF = poof;
		}
	}
});

export const { updateAllCurrencies } = CurrencyAPI.actions;

export const SelectCurrencies = (state: RootState) => state.currencies;
export const SelectCelo = (state: RootState) => state.currencies.CELO;
export const SelectCusd = (state: RootState) => state.currencies.cUSD;
export const SelectCeur = (state: RootState) => state.currencies.cEUR;

export default CurrencyAPI.reducer;
