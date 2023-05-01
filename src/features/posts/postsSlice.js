import { createSlice } from '@reduxjs/toolkit'
import { getPostsAsync,addPostAsync } from './postsActions';

const initialState = {
    isLoading: false,
    error: null,
    posts:[]
  
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPostsAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getPostsAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.posts = payload
            })
            .addCase(getPostsAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(addPostAsync.pending, (state) => {
            state.isLoading = 'true';
            })
            .addCase(addPostAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload
            })
            .addCase(addPostAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            });
    },
});

export default postsSlice.reducer;
