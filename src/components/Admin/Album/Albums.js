import React, { useContext }  from 'react'
import { AlbumContext } from '../../../contexts/AlbumContext'
import AlbumList from './AlbumList'

const Albums = () => {
  const { albums } = useContext(AlbumContext)
  let albumsData = albums.data && albums.data
  return (
    <div className="Albums">
      {albums.loading && <div className="loader">Loading ...</div>}
      {albums.data
         && <AlbumList albums = { albumsData } />
      }
    </div>
  )
}

export default Albums