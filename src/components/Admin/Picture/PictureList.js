import React, { useContext } from 'react'
import PictureDetails from './PictureDetails'
import { Grid, Header } from 'semantic-ui-react'
import CreatePicture from './CreatePicture'
import ModalSection from '../../Shared/modal/ModalSection'
import { AuthContext } from '../../../contexts/AuthContext'

const PictureList = ({ pictures }) => {
  const { auth } = useContext(AuthContext)

  // const userId = auth && auth.user.id

  // const usersPics = auth && pictures.filter(p => userId === p.user_id)

  // console.log('userId --', userId)
  // console.log('userPics --', usersPics)

  // const sortedPics = auth.user && usersPics.sort((a,b) =>  b.id-a.id )


  const sortedPics = auth.user && pictures.sort((a,b) =>  b.id-a.id )

  return (
    <div className='PictureList'>
      { auth.user &&
      <ModalSection
        btnIcon={'edit'}
        btnContent={'new picture'}
        compToModal={ CreatePicture }
        headerContent={'New Picture'}
      />
      }

      <Header as='h2' dividing content='Kuvat' />

      <Grid doubling columns={4}>
        { auth.user &&
          sortedPics.map(picture =>
            <Grid.Column  key={picture.id}>
              <PictureDetails key={picture.id} picture={picture} />
            </Grid.Column>
          )
        }
      </Grid>
    </div>
  )
}

export default PictureList