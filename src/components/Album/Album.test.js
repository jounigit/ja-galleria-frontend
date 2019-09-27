import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Album from './Album'
import { BrowserRouter } from 'react-router-dom'

const album = {
  loading: false,
  data: [
    {
      id: 1,
      title: 'Albumi 1',
      content: 'Album 1 sisältö.',
      user: {
        id: 1,
        name: 'Ms. Alysa Kassulke',
        email: 'lemke.ivory@example.net',
        email_verified_at: '2019-09-04 15:33:50',
        is_admin: 0,
        created_at: '2019-09-04 15:33:50',
        updated_at: '2019-09-04 15:33:50',
        deleted_at: null
      },
      category: {
        id: 2,
        user_id: 5,
        title: 'Kategoria 2',
        slug: 'provident-officia-eaque-quisquam-sed-sit',
        content: 'Voluptatem maxime ipsa molestiae aliquid perspiciatis non debitis sequi. Atque velit ab ad laboriosam quo. Et omnis asperiores molestiae voluptas aut.',
        created_at: '2019-09-04 15:33:50',
        updated_at: '2019-09-04 15:33:52',
        deleted_at: null
      },
      pictures: [
        {
          id: 1,
          user_id: 1,
          title: 'Prof.',
          slug: 'velit-officiis-necessitatibus-iste',
          content: 'Fugit autem mollitia distinctio quasi fugit. Harum nobis minima quidem et. Architecto magni doloribus molestiae reiciendis.',
          image: 'https://source.unsplash.com/random',
          thumb: 'https://source.unsplash.com/random',
          created_at: '2019-09-04 15:33:50',
          updated_at: '2019-09-04 15:33:50',
          deleted_at: null,
          pivot: {
            album_id: 1,
            picture_id: 1
          }
        },
        {
          id: 2,
          user_id: 1,
          title: 'Prof.',
          slug: 'velit-officiis-necessitatibus-iste',
          content: 'Fugit autem mollitia distinctio quasi fugit. Harum nobis minima quidem et. Architecto magni doloribus molestiae reiciendis.',
          image: 'https://source.unsplash.com/random',
          thumb: 'https://source.unsplash.com/random',
          created_at: '2019-09-04 15:33:50',
          updated_at: '2019-09-04 15:33:50',
          deleted_at: null,
          pivot: {
            album_id: 1,
            picture_id: 1
          }
        },
      ]
    },
  ],
}

describe('<Album />', () => {
  let component

  beforeEach(() => {
    component = render(
      <BrowserRouter>
        <Album match={1} />
      </BrowserRouter>
    )
  })

  console.log(component)

  const albums = component.container.querySelectorAll('.album')
  expect(albums.length).toBe(2)
})