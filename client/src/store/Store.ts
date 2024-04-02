import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./features/generalSlice.ts";
import userReducer from "./features/userSlice.ts";
import teamReducer from "./features/teamSlice.ts";


const store = configureStore({
    reducer:{
        general:generalReducer,
        users:userReducer,
        teams:teamReducer
    }
})


export default store;