import { createSlice } from '@reduxjs/toolkit'
import { createUserAsync } from './registerActions';

const initialState = {
    isLoading: false,
    error: null,
  
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(createUserAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
            })
            .addCase(createUserAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            });
    },
});

export default registerSlice.reducer;
