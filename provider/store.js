import { configureStore } from '@reduxjs/toolkit';
import themeReducer from "./reducers/themeReducer";
import drawerReducer from "./reducers/drawerReducer";
import sideBarReducer from "./reducers/sideBarReducer";
import userReducer from "./reducers/userReducer";
import cookieReducer from './reducers/cookieReducer';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        drawer: drawerReducer,
        sidebar: sideBarReducer,
        cookie: cookieReducer,
        user: userReducer,
    },
});

export default store;