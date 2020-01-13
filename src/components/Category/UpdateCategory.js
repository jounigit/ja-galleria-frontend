import React, { useState, useContext } from 'react'
import { Header, Container } from 'semantic-ui-react'
import { CategoryContext } from '../../contexts/CategoryContext'
import apiService from '../../services/apiService'
import { UPDATE_CATEGORY } from '../../reducers/actionTypes'
import CategoryForm from './CategoryForm'

const UpdateCategory = ({ ...props } ) => {
  const initialState = {
    title: props.title,
    content: props.content,
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
      const result = await apiService.update('categories', props.id, newData)
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
    setTimeout(() => props.setModalOpen(), 2000)
    return (
      <Container>
        <Header as='h3' color='green' data-cy='success-message'>{data.message}</Header>
      </Container>
    )
  }

  return ( // <Modal as={Form} onSubmit={e => handleSubmit(e)} open={true} size="tiny">
    <Container>
      <CategoryForm
        errorMessage={data.errorMessage}
        title={data.title}
        content={data.content}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        formHeader={'Päivitä kategoria'}
      />
    </Container>

  )

}

export default UpdateCategory