import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({ album }) => {
  return(
    <li>
      <h3>
        {album.title}
      </h3>
      <p>{album.content}</p>
      <Link to={`/albums/${album.id}`}>
            show
      </Link>
    </li>
  )
}

export default ListItem