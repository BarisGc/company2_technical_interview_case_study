import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Fetch Data
export const fetchUsers = createAsyncThunk('users/getUsers',
    async () => {
        let one = "https://run.mocky.io/v3/9ea07671-86ea-4b0a-9b3b-0f195ccab3a3"
        let two = "https://run.mocky.io/v3/0faaa10a-c0ca-4d79-944b-02bc6e00a02d"
        let three = "https://run.mocky.io/v3/041cfdde-2ef3-4a8e-b622-763613da672d"

        const requestOne = await axios.get(one);
        const requestTwo = await axios.get(two);
        const requestThree = await axios.get(three);

        const allData = await axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]
            const responesThree = responses[2]
            const mergedData = [responseOne.data, JSON.parse(responseTwo.data.replace(/\s*"job"/g, ',"job"')), responesThree.data]
            console.log("mergedData", mergedData)
            return mergedData
        }))
        return allData
    }
);

export const usersSlice = createSlice({
    name: 'userData',
    initialState: {
        users: [],
        users_detail: [],
        courses: [],
        mergedAllData: [],
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
        newCourseDataForUser: [],
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
        },
        updateMergedAllData: (state, action) => {
            state.tableData = action.payload
        },
        changeUserName: (state, action) => {
            const { userID, name } = action.payload
            state.users.find((user) => (user.id == userID)).name = name
        },
        changeUserDetails: (state, action) => {
            const { userID, age, job } = action.payload
            state.users_detail.find((userDetail) => (userDetail.user_id == userID)).age = age
            state.users_detail.find((userDetail) => (userDetail.user_id == userID)).job = job
        },
        assignNewCourseToUser: (state, action) => {
            const { userID, course_name, measured_at, completed_at } = action.payload
            state.newCourseDataForUser.push({
                userID: userID,
                course_name: course_name,
                measured_at: measured_at,
                completed_at: completed_at,
            })
        },
    },
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.users = [...action.payload[0]];
            state.users_detail = [...action.payload[1]];
            state.courses = [...action.payload[2]];

        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    },
});

export const { changeUsersPage, selectFilterOption, defineUserPageLimit, updateTableData, updateMergedAllData, changeUserName, changeUserDetails, assignNewCourseToUser } = usersSlice.actions;

export default usersSlice.reducer;