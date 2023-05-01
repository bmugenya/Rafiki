import { createSlice } from '@reduxjs/toolkit'
import { getCommentAsync,addCommentAsync } from './commentActions';

const initialState = {
    isLoading: false,
    error: null,
    comment:[]
  
};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCommentAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getCommentAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.comment = payload
            })
            .addCase(getCommentAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(addCommentAsync.pending, (state) => {
            state.isLoading = 'true';
            })
            .addCase(addCommentAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload
            })
            .addCase(addCommentAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            });
    },
});

export default commentSlice.reducer;
