import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPosts, addPost } from './postsApi'


export const getPostsAsync = createAsyncThunk(
    '/posts',
    async () => {
        try {
            const response = await getPosts();
            console.log(response)
            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);

export const addPostAsync = createAsyncThunk(
    '/add/post',
    async ({text,email}) => {
        try {
            const response = await addPost(text,email);
            console.log(response)
            return response;
        } catch(error) {
            console.log(error)

        }
    }
);