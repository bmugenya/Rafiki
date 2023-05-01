import { useEffect } from "react";
import './assets/App.css'
import Router from "./helpers/router"
import { useDispatch } from 'react-redux'
import { getPostsAsync } from "./features/posts/postsActions"

export default function App() {
  const dispatch = useDispatch();


useEffect(() => {
    dispatch(getPostsAsync())

   })


  return (
    <div className='app'>
      <Router/>
    </div>
  )
}
