import React from 'react'
// import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { render } from '@testing-library/react'
import CategoryList from './CategoryList'
import { BrowserRouter } from 'react-router-dom'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})


test('should render all categories ', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <CategoryList />
      </BrowserRouter>, container)
  })

  container.debug()

  expect(container).toHaveTextContent('loading..')
  await act(async () => {
    render(
      <BrowserRouter>
        <CategoryList />
      </BrowserRouter>, container)
  })

  // const categories = container.querySelectorAll('h3')
  // expect(categories.length).toBe(3)

  // expect(container).toHaveTextContent('Categoria 1')

  // expect(container).toHaveTextContent('Eaque a culpa et qui nam fugiat.')
})


