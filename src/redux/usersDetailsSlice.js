// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchUserDetails = createAsyncThunk('userDetails/getUserDetails', async () => {
//     const res = await axios(
//         `${process.env.REACT_APP_API_BASE_ENDPOINT}/images/search?limit=30&order=ASC`)
//     return res.data
// });

// export const usersDetailsSlice = createSlice({
//     name: 'userDetail',
//     initialState: {
//         items: [],
//         status: 'idle',
//     },
//     reducers: {},
//     extraReducers: {
//         [fetchUserDetails.fulfilled]: (state, action) => {
//             state.items = action.payload;
//             state.status = 'succeeded'
//         },
//         [fetchUserDetails.pending]: (state, action) => {
//             state.status = 'loading'
//         },
//         [fetchUserDetails.rejected]: (state, action) => {
//             state.status = 'failed';
//             state.error = action.error.message;
//         },
//     },
// });

// export const imageGallerySelector = (state) => state.imageGallery.items;
// export const statusSelector = (state) => state.imageGallery.status;
// export const errorSelector = (state) => state.imageGallery.error;

// export default usersDetailsSlice.reducer;
