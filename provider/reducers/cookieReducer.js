import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isCookie: false,
}

export const cookieSlice = createSlice({
    name: 'cookie',
    initialState,
    reducers: {
        setCookie: (state, action) => {
            state.isCookie = action.payload;
        },
        removeCookie: (state, action) => {
            state.isCookie = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setCookie, removeCookie } = cookieSlice.actions;

export default cookieSlice.reducer;