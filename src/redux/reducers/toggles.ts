import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
	mobileMenu: false
};

export const toggleSlice = createSlice({
	name: 'storage',
	initialState: initialState,
	reducers: {}
});

export const {} = toggleSlice.actions;

export const selectToggle = (state: RootState) => state.toggle;

export default toggleSlice.reducer;
