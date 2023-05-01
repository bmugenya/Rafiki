import React, { useState } from 'react'
import '../assets/Header.css'
import FlagIcon from '@mui/icons-material/Flag'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ForumIcon from '@mui/icons-material/Forum'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { url } from '../context/url'
import HelpIcon from '@mui/icons-material/Help'


const StyledMenu = styled(Menu)(({ theme }) => ({
  border: '1px solid #d3d4d5',
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:focus': {
    backgroundColor: theme.palette.primary.main,
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      color: theme.palette.common.white,
    },
  },
}));


function Header() {
  const [search, setSearch] = useState('')
  const name = localStorage.getItem('name')
  const image = localStorage.getItem('image')
  const email = localStorage.getItem('email')

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${url}/rafiki/search`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search: search,
      }),
    })
    setSearch('')
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const [notification, setNotification] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const openNot = (event) => {
    setNotification(event.currentTarget)
  }

  const closeNot = () => {
    setNotification(null)
  }

  return (
    <>
      <div className='header'>
        <div className='header_left'>
          <img
            src='https://cdn.pixabay.com/photo/2020/06/24/05/29/tree-5334822_960_720.png'
            alt='logo'
          />
          <div className='header_option'>
            <Link to='/home'>
              <h3>Rafiki</h3>
            </Link>
          </div>
        </div>
        <div className='header_right'>
          <div className='header_input'>
            <form>
              <SearchIcon />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search Topic'
                type='text'
              />
              <button onClick={handleSubmit} type='submit'>
                Hidden Button
              </button>
            </form>
          </div>
          <IconButton>
            <Link to='/chat/gambling'>
              <ForumIcon fontSize='small' />
            </Link>
          </IconButton>
          <IconButton onClick={openNot}>
            <NotificationsActiveIcon />
          </IconButton>
          <IconButton onClick={handleClick}>
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </div>
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <div className='header_info'>
            {name ? (
              <>
                <Avatar src={image} />
                <h4>{name}</h4>
              </>
            ) : (
              <></>
            )}
          </div>
        </StyledMenuItem>
        <Link to='/faq'>
          <StyledMenuItem>
            <ListItemIcon>
              <FlagIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary='FAQ' />
          </StyledMenuItem>
        </Link>
        <Link to='/questionaire'>
          <StyledMenuItem>
            <ListItemIcon>
              <HelpIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary='questionaire' />
          </StyledMenuItem>
        </Link>
        <Link to='/'>
          <StyledMenuItem>
            {name ? (
              <>
                <ListItemIcon>
                  <ExitToAppIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary='Log Out' />
              </>
            ) : (
              <>
                <ListItemIcon>
                  <ExitToAppIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText fontSize='small' primary='Sign In' />
              </>
            )}
          </StyledMenuItem>
        </Link>
      </StyledMenu>

      <StyledMenu
        id='customized-menu'
        anchorEl={notification}
        keepMounted
        open={Boolean(notification)}
        onClose={closeNot}
      >
        <StyledMenuItem>
          <ListItemText primary='notification' />
        </StyledMenuItem>
      </StyledMenu>
    </>
  )
}

export default Header
