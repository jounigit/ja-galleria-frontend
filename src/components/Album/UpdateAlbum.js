import React, { useState, useContext } from 'react'
import { Container, Header } from 'semantic-ui-react'
import { AlbumContext } from '../../contexts/AlbumContext'
import { UPDATE_ALBUM } from '../../reducers/actionTypes'
import AlbumForm from './AlbumForm'
import { updateData } from '../../services/apiService'

const UpdateAlbum = ({ ...props }) => {
  const initialState = {
    title: props.title,
    content: props.content,
    category_id: props.category_id,
    isSubmitting: false,
    errorMessage: null,
    message: null
  }
  // Component's state
  const [data, setData] = useState(initialState)
  const { albums, dispatch } = useContext(AlbumContext) // Album actions

  // :::::::::::::::::::::::::::::::::::: //
  // handle input values
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }
  // handle errors
  const handleError = error => {
    setData({
      ...data,
      isSubmitting: false,
      errorMessage: error
    })
  }
  // console.log('INPUTS :::', data)

  // ----- handle form submit - post new data ---------- //
  const handleFormSubmit = async(event) => {
    event.preventDefault()
    if(data.title === '') {
      return handleError('title is required!')
    }

    const newData = {
      title: data.title,
      content: data.content,
      category_id: data.category_id
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    })

    updateData(dispatch, UPDATE_ALBUM, 'albums', props.id, newData)
    if( !albums.isLoading && albums.errorMessage==='') {
      setData({
        title: '',
        content: '',
        isSubmitting: false,
        errorMessage: null,
        message: 'Album updated successfully.'
      })
    }
  }

  // :::::::::::::::::::::::::::::::::::: //
  if (data.message) {
    localStorage.setItem('reloadPage', 'categories')
    setTimeout(() => props.setModalOpen(), 2000)
    return (
      <Container data-cy='success-message'>
        <Header as='h3' color='green' data-cy='message'>{data.message}</Header>
      </Container>
    )
  }

  return (
    <Container>
      <AlbumForm
        errorMessage={data.errorMessage}
        title={data.title}
        content={data.content}
        category_id={data.category_id}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        formHeader={'Päivitä albumi'}
      />
    </Container>
  )
}

export default UpdateAlbum