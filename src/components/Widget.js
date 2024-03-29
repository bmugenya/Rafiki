import React from 'react'
import '../assets/Widget.css'

export default function Widget() {
  return (
    <div className='widgets'>
      <iframe
        src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAnonymousRafiki%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=757131328123738'
        width='340'
        height='500'
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling='no'
        frameborder='0'
        allowfullscreen='true'
        allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
        title='Rafiki'
      ></iframe>
    </div>
  )
}
