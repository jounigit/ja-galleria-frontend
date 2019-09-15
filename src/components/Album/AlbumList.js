import React, { Fragment } from 'react'
import Album from './Album'

const AlbumList = ({ albums }) => {
  console.log('DATA -- ', albums.loading)

  if(albums.loading) {
    return <div className='loader'>Loading ...</div>
  }
  console.log(albums.data)
  return (
    <Fragment>
      <h2>Albumit</h2>
      {albums.data &&
          albums.data.map(album =>
            <Album key={album.id} album={album} />
          )
      }
    </Fragment>
  )
}

export default AlbumList