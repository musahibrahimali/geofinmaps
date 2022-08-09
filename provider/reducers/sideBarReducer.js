import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSideBarOpen: false,
}

export const sideBarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        openSideBar: (state, action) => {
            state.isSideBarOpen = action.payload;
        },
        closeSideBar: (state, action) => {
            state.isSideBarOpen = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { openSideBar, closeSideBar } = sideBarSlice.actions;

export default sideBarSlice.reducer;