import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Category from './Category'
import { BrowserRouter } from 'react-router-dom'

const category = {
  id: 2,
  title: 'Category',
  content:
    'Kategorian sisältöä.',
  user: {
    id: 1,
    name: 'User 1',
    email: 'user@example.net',
    email_verified_at: '2019-09-04 15:33:50',
    is_admin: 0,
    created_at: '2019-09-04 15:33:50',
    updated_at: '2019-09-04 15:33:50',
    deleted_at: null
  },
  albums: [
    {
      id: 1,
      user_id: 1,
      category_id: 2,
      title: 'Kuvat 1',
      slug: 'kuvat-1',
      content:
        'Kuvat 1 sisältöä.'
    },
    {
      id: 2,
      user_id: 2,
      category_id: 2,
      title: 'Kuvat 2',
      slug: 'kuvat-2',
      content:
        'Kuvat 2 sisältöä.'
    }
  ]
}

describe('<Category />', () => {
  let component

  beforeEach(() => {
    component = render(
      <BrowserRouter><Category category={category} /></BrowserRouter>
    )
  })


  test('category has creator', () => {
    const h4 = component.container.querySelector('h4')
    expect(h4).toHaveTextContent(category.user.name)
  })

  test('category has albums', () => {
    const categories = component.container.querySelectorAll('li')
    expect(categories.length).toBe(2)
  })

  // test('Category renders correctly', () => {
  //   const tree = renderer.create(<Category category={category} />).toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
})
