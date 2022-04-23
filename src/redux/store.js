import { configureStore } from "@reduxjs/toolkit";

import usersSlice from "./usersSlice";
import usersDetailsSlice from "./usersDetailsSlice";

export const store = configureStore({
    reducer: {
        userData: usersSlice,
        usersDetails: usersDetailsSlice
    },
});