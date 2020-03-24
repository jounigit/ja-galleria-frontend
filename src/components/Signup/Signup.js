import React, { useState } from 'react'
import axios from 'axios'
import { Card, Header, Form, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router'

const baseUrl = process.env.REACT_APP_API

const url = `${baseUrl}/register`

const Signup = () => {
  const initialState = {
    username: '',
    email: '',
    password: '',
    isSubmitting: false,
    message: null,
    errorMessage: null
  }
  const [data, setData] = useState(initialState)

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const handleError = error => {
    setData({
      ...data,
      isSubmitting: false,
      errorMessage: error
    })
  }

  const handleFormSubmit = async(event) => {
    event.preventDefault()
    if(data.username === '') {
      return handleError('username is required!')
    }

    if(data.email === '') {
      return handleError('email is required!')
    }
    if(data.password.length < 6) {
      return handleError('The password must be at least 6 characters!')
    }
    if(data.password === '') {
      return handleError('password is required!')
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    })

    try {
      await axios.post(url,
        {
          name: data.username,
          email: data.email,
          password: data.password
        })

      setData({
        username: '',
        email: '',
        password: '',
        isSubmitting: false,
        errorMessage: null,
        message: 'User signed up successfully'
      })
    } catch (error) {
      console.log('=ERROR: ', error.message)
      handleError('incorrect email or password!')
    }

  }
  // console.log('STATE -- ', data)
  // :::::::::::::::::::::::::::::::::::: //
  if (data.message) {
    return <Redirect to='/login' />
  }

  return (
    <Card centered style={{ marginTop: 20 }}>
      <Card.Content>
        <Header as='h2' color='green'>Sign up</Header>
      </Card.Content>
      <Card.Content>

        {data.errorMessage && (
          <Header as='h4' color='red' data-cy='error-message'>{data.errorMessage}</Header>

        )}
        <Form onSubmit={ handleFormSubmit }>
          <Form.Field>
            <label>Userame</label>
            <input
              data-cy='username'
              type='username'
              value={data.name}
              onChange={handleInputChange}
              name='username'
              id='username'
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              data-cy='email'
              type='email'
              value={data.email}
              onChange={handleInputChange}
              name='email'
              id='email'
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              data-cy='password'
              type='password'
              value={data.password}
              onChange={handleInputChange}
              name='password'
              id='password'
            />
          </Form.Field>


          <Button data-cy='submit' type='submit'>login</Button>
        </Form>
      </Card.Content>
    </Card>
  )
}

export default Signup