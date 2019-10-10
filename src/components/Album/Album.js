import React, { Fragment, useState } from 'react'
import { Picture } from '../Picture'

const Album = ( { album }) => {
  const [visible, setVisible] = useState(false)
  console.log('ALBUM at album -- ', album)
  // const pictures = () => album.pictures.map(p =>
  //   <Picture key={p.id} picture={p} />
  // )

  const showWhenVisible = { display: visible ? '' : 'none' }
  const linkable = {
    color: 'Blue',
    textDecoration: 'Underline'
  }

  return (
    <Fragment>
      <h3 style={linkable} onClick={() => setVisible(!visible)}>
        {album.title}
      </h3>

      <div style={showWhenVisible}>
        <p>
          {album.content}
        </p>
        <h4>
          {album.user.name}
        </h4>
        <h3>Pictures</h3>
        {/* <ul>
          {pictures().length > 0 ? pictures() : 'no albums'}
        </ul> */}
      </div>
    </Fragment>
  )
}

export default Album