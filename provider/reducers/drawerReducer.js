import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isDrawerOpen: false,
}

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        openDrawer: (state, action) => {
            state.isDrawerOpen = action.payload;
        },
        closeDrawer: (state, action) => {
            state.isDrawerOpen = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { openDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;