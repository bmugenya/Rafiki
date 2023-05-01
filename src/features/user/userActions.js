import { createAsyncThunk } from '@reduxjs/toolkit'
import { authUser } from './userApi'
import Cookies from 'js-cookie'


export const authUserAsync = createAsyncThunk(
    '/login',
    async ({ email, password }, {rejectWithValue }) => {
        try {
            const response = await authUser(email,password);
            Cookies.set('token', response.token)
            return response;

        } catch(error) {
            if (error.response && error.response.message) {
                return rejectWithValue(error.response.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);