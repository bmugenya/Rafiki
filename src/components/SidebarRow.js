import React from 'react'
import { Avatar } from '@material-ui/core'
import '../assets/SidebarRow.css'
const SidebarRow = ({ src, Icon, title }) => {
  return (
    <div className='sidebarRow'>
      {src && <Avatar src={src} />}
      {Icon && <Icon />}
      <h1>{title}</h1>
    </div>
  )
}

export default SidebarRow
