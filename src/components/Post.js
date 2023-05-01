import React, { json, useState } from 'react'

import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import NearMeIcon from '@mui/icons-material/NearMe'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import '../assets/Post.css'
import  ExpandMoreOutlined  from '@mui/icons-material/ExpandMoreOutlined'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Comment from './Comment'
import Comments from './comments'
import Moment from 'react-moment'
import { convertFromRaw } from 'draft-js'
import useAuthListener from '../hooks/use-auth-listener'
import { useSelector, useDispatch } from 'react-redux';
import { getCommentAsync } from '../features/comment/commentActions';


// const container = styled.div`
//     display: 'block',
//     width: '100%',
// `;

function Post({ image, username, timestamp, message, id, isRafiki,respCount }) {
  const user  = useAuthListener()
    const [isCommentsLoaded, setIsCommentsLoaded] = useState(false);


  const dispatch = useDispatch();

  const handleLoadComments = () => {
    if (!isCommentsLoaded) {
      dispatch(getCommentAsync(id));
      setIsCommentsLoaded(true);
    }
  };

  return (
    <div className='post'>
      {isRafiki ? (
        <>
          <div className='post_top'>
            <Avatar src={image} />
            <div className='post_topinfo'>
              <h3>{username}</h3>
              <p>
                <Moment fromNow>{timestamp}</Moment>
              </p>
            </div>
          </div>
          <div className='post_bottom'>
            {/* {Object.keys(message).map((key) => message[key])} */}
          </div>

        </>
      ) : (
        <>
          <div className='post_top'>
              <Moment fromNow>{timestamp}</Moment>

          </div>
          <div className='post_bottom'>
           {message}
          </div>
        </>
      )}

 <Accordion>
        <AccordionSummary onClick={handleLoadComments} className='post_options'>
          Load {respCount} comments
          <ExpandMoreIcon />
        </AccordionSummary>
        <AccordionDetails>
          <Comment id={id} />
          <div className='comment'>
            <Comments id={id} />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Post
