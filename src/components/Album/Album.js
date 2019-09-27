import React from 'react'
import useFetch from '../../utils/useFetch'
import  Picture  from '../Picture/Picture'
const baseUrl = 'http://localhost:8000/api'

const Album = ( props) => {
  const { id } = props.match.params
  //   console.log('ALBUM ID: ', id)
  const album = useFetch(
    `${baseUrl}/albums/${id}`
  )
  //   console.log('ALBUM FETCH: ', album)
  //   console.log('DATA -- ', album.loading)

  if(album.loading) {
    return <div className='loader'>Loading ...</div>
  }
  console.log('ALBUM -- ', album.data)
  console.log('Pics -- ', album.data.data.pictures)

  //   const [visible, setVisible] = useState(false)
  //   console.log('CAT -- ', album.pictures)
  const pictures = () => album.data.data.pictures.map(p =>
    <Picture key={p.id} picture={p} />
  )

  //   const showWhenVisible = { display: visible ? '' : 'none' }
  //   const linkable = {
  //     color: 'Blue',
  //     textDecoration: 'Underline'
  //   }

  return (
    <div className='album'>
      <h3>{album.data.data.title}</h3>
      <p>
        {album.data.data.content}
      </p>
      <ul>
        {pictures().length > 0 ? pictures() : 'no albums'}
      </ul>
      {/* <h3 style={linkable} onClick={() => setVisible(!visible)}>
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
        <ul>
          {pictures().length > 0 ? pictures() : 'no albums'}
        </ul>
      </div> */}
    </div>
  )
}

export default Album