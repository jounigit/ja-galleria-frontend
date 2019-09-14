import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('renders content', async () => {

  await act(async () => {
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
      , container)
  })

  expect(container).toHaveTextContent(
    'Kuvagalleria'
  )
})
