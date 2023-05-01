import React, { useState, useEffect, Json } from 'react'
import '../assets/Feed.css'
import Sender from './Sender'
import Post from './Post'
import { url } from '../context/url'
import '../assets/draft.css'
import useAuthListener from '../hooks/use-auth-listener'
import { useDispatch, useSelector } from 'react-redux'





function Feed() {

  
  const { posts } = useSelector((state) => state.posts)



 const { user, loading } = useAuthListener()


  return (
    <div className='feed'>
     
  <Sender />


      {posts.map((post) => (
        <Post
          key={post.id}
          message={post.content}
          timestamp={post.timestamp}
          username={post.name}
          image={post.image}
          id={post.id}
          isRafiki={post.isRafiki}
          respCount={post.respCount}
        />
      ))}
    </div>
  )
}

export default Feed
