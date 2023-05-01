import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Moment from 'react-moment';
import { url } from '../context/url';
import { getCommentAsync } from '../features/comment/commentActions';
import useAuthListener from '../hooks/use-auth-listener';
import '../assets/Chat.css';

const Comments = memo(({ id }) => {
  const { comment, isLoading, error } = useSelector((state) => state.comment);
 
  // if (error) return <p>Error: {error.message}</p>;
  if (!comment.length) return <p>No comments found.</p>;

  return (
    <div className='chat_body' style={{ background: '#ffffff' }}>
      {comment.map((post) => (
        <div key={post.id}>
          <Avatar  />
          <p className='comment_message' style={{ background: '#eff2f5' }}>
            <span className='chat_name'>{post.name}</span>
            {post.content}
            <span className='chat_time'>
              <Moment fromNow>{post.timestamp}</Moment>
            </span>
          </p>
        </div>
      ))}
    </div>
  );
});

export default Comments;
