import React, { Fragment, useState } from 'react'
import { Picture } from '../Picture'

const Album = ( { album, visibility = false }) => {
  const [visible, setVisible] = useState(visibility)
  // console.log('ALBUM PICS -- ', album.pictures)
  const pictures = () => album.pictures.map(p =>
    <Picture key={p.id} picture={p} />
  )

  const showWhenVisible = { display: visible ? '' : 'none' }
  const linkable = {
    color: 'Blue',
    textDecoration: 'Underline'
  }
  console.log('ALBUM -- ', album)
  return (
    <Fragment>
      <h3 style={linkable} onClick={() => setVisible(!visible)}>
        {album.title}
      </h3>

      <div style={showWhenVisible}>
        <p>
          {album.content}
        </p>
        {/* <h4>
          {album.user.name}
        </h4> */}
        <h3>Pictures</h3>
        <ul>
          {pictures().length > 0 ? pictures() : 'no albums'}
        </ul>
      </div>
    </Fragment>
  )
}

export default Album