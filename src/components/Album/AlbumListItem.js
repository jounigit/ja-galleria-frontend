import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Item } from 'semantic-ui-react'
import { AuthContext } from '../../App'
import UpdateAlbum from './UpdateAlbum'
import RemoveAlbum from './RemoveAlbum'
import ModalSection from '../Shared/modal/ModalSection'

const Album = ({ album }) => {
  const { state } = useContext(AuthContext)

  const pictures = album.pictures

  const firstPic = pictures && pictures.length > 0 ?
    pictures[0].thumb : ''
  return (
    <div data-cy='albumListItem'>
      <Item.Group divided>
        <Item>
          <Item.Image size='small' src={firstPic} />
          <Item.Content>
            <Item.Header data-cy='header'>{album.title}</Item.Header>
            <Item.Meta>
              <span className='stay'>Author - {album.user.name}</span>
            </Item.Meta>
            <Item.Meta>
              {pictures.length + ' - kuvaa' || 'no pictures'}
            </Item.Meta>
            <Item.Description>{album.content && album.content.substring(0,260) }...</Item.Description>
            <Item.Extra>
              <Link to={`/albums/${album.id}`}>show</Link>
            </Item.Extra>
            <Item.Extra>
              { state.user &&
              <ModalSection
                btnIcon={'edit'}
                compToModal={ UpdateAlbum }
                headerContent={'Update Album'}
                id={ album.id }
                title={album.title}
                content={album.content}
                category_id={album.category_id}
              />
              }
              { state.user &&
              <RemoveAlbum
                id={ album.id }
                title={album.title}
                author={album.user.name}
              />
              }
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>

      <div className="ui divider"></div>
    </div>

  )
}

export default Album