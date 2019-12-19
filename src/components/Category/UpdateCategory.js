import React, { useState, useContext } from 'react'
import { Header, Button, Container, Modal, Icon, Transition } from 'semantic-ui-react'
import { CategoryContext } from '../../contexts/CategoryContext'
import apiService from '../../services/apiService'
import { UPDATE_CATEGORY } from '../../reducers/actionTypes'
import CategoryForm from './CategoryForm'

const UpdateCategory = ({ id, title, content } ) => {
  const initialState = {
    title: title,
    content: content,
    isSubmitting: false,
    errorMessage: null,
    message: null
  }

  const [data, setData] = useState(initialState)
  const { dispatch } = useContext(CategoryContext)

  // :::::::::::::::::::::::::::::::::::: //

  // hande input values
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
  // ----- handle form submit - post new data ---------- //
  const handleFormSubmit = async(event) => {
    event.preventDefault()
    if(data.title === '') {
      return handleError('title is required!')
    }

    const newData = {
      title: data.title,
      content: data.content
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    })

    try {
      const result = await apiService.update('categories', id, newData)
      const newAlbum = result.data

      dispatch({
        type: UPDATE_CATEGORY,
        data: newAlbum
      })
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: null,
        message: result.message
      })
    } catch (error) {
      handleError('failed updating category!')
    }

  }

  // :::::::::::::::::::::::::::::::::::: //
  if (data.message) {
    setTimeout(() => setData({ ...data, message: null }), 4000)
    return (
      <Container>
        <Header as='h3' color='green' data-cy='message'>{data.message}</Header>
      </Container>
    )
  }

  const updateButton = <Button floated='right'
    color='green'
    size='tiny'
    data-cy='update'
  >
    <Icon name='edit' />
  </Button>

  return ( // <Modal as={Form} onSubmit={e => handleSubmit(e)} open={true} size="tiny">
    <Container>
 

      <Modal trigger={ updateButton }  size='tiny'>
        <Modal.Header>Uusi Category</Modal.Header>
        <Modal.Content>
          <CategoryForm
            errorMessage={data.errorMessage}
            title={data.title}
            content={data.content}
            handleFormSubmit={handleFormSubmit}
            handleInputChange={handleInputChange}
            formHeader={'Päivitä kategoria'}
          />
        </Modal.Content>
      </Modal>
    </Container>

  )

}

export default UpdateCategory