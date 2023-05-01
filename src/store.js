import { configureStore  } from '@reduxjs/toolkit'
import register from "./features/register/registerSlice"
import user from './features/user/userSlice'
import posts from './features/posts/postsSlice'
import comment from './features/comment/commentSlice'

const store = configureStore({
  reducer: {
    register,
    user,
    posts,
    comment
  },
  devTools: process.env.NODE_ENV !== 'production',
})
export default store