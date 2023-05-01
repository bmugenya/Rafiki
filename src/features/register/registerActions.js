import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUser } from './registerApi'


export const createUserAsync = createAsyncThunk(
    '/register',
    async ({ username, email, password }, {rejectWithValue }) => {
        try {
            const response = await createUser(username, email,password);
            return response;
        } catch(error) {
            console.log(error)
            if (error) {
                return rejectWithValue(error)
            } else {
                return rejectWithValue(error)
            }
        }
    }
);