import { createAsyncThunk } from '@reduxjs/toolkit'
import { getComment, addComment } from './commentApi'


export const getCommentAsync = createAsyncThunk(
    '/comment',
    async (post_id) => {
        try {
            const response = await getComment(post_id);
            console.log(response)
            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);

export const addCommentAsync = createAsyncThunk(
    '/add/comment',
    async ({text,email,post_id}) => {
        try {
            const response = await addComment(text,email,post_id);
            console.log(response)
            return response;
        } catch(error) {
            console.log(error)

        }
    }
);