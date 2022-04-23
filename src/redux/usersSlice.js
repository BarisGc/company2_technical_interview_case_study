import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Fetch Data
export const fetchUsers = createAsyncThunk('users/getUsers', async () => {
    const res = await axios(
        `https://run.mocky.io/v3/9ea07671-86ea-4b0a-9b3b-0f195ccab3a3`);
    return res.data
});

let one = "https://run.mocky.io/v3/9ea07671-86ea-4b0a-9b3b-0f195ccab3a3"
let two = "https://run.mocky.io/v3/0faaa10a-c0ca-4d79-944b-02bc6e00a02d"
let three = "https://run.mocky.io/v3/041cfdde-2ef3-4a8e-b622-763613da672d"

const requestOne = axios.get(one);
const requestTwo = axios.get(two);
const requestThree = axios.get(three);


export const usersSlice = createSlice({
    name: 'userData',
    initialState: {
        users: [],
        users_detail: [],
        courses: [],
        status: 'idle',
        currentPage: 1,
        hasNextPage: true,
        userPageLimit: 6,
        userPageOffset: 0,
        filterTypes: {
            searchName: '',
            userStatusFilter: '',
        },
        tableData: [],
    },
    reducers: {
        changeUsersPage: (state, action) => {
            state.currentPage = action.payload
            state.userPageOffset = (state.currentPage - 1) * state.userPageLimit
        },
        selectFilterOption: (state, action) => {
            state.filterTypes = action.payload;
        },
        defineUserPageLimit: (state, action) => {
            state.userPageLimit = action.payload;
        },
        updateTableData: (state, action) => {
            state.tableData = action.payload
        }
    }, //blank because i used "createAsyncThunk + extraReducers"
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.users = [...action.payload];
            state.status = 'succeeded';
        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    },
});

export const { changeUsersPage, selectFilterOption, defineUserPageLimit, updateTableData } = usersSlice.actions;

export default usersSlice.reducer;