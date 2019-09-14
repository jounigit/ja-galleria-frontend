import React, { useState, useEffect } from 'react'
import CategoryService from '../../services/categoryService'

const Category = ( props ) => {
  const [Category, setCategory] = useState([])
  const { id } = props.match.params
  console.log('ID: ', id)

  useEffect(() => {
    CategoryService
      .getOne(id)
      .then(response => {
        setCategory(response.data)
      })
  }, [])
  const creator = Category.user.name
  const albums = () => Category.albums.map(a =>
    <li key={a.id}>{a.name}</li>
  )

  return (
    <div className='category'>
      <h2>
        {Category.title}
      </h2>
      <p>
        {Category.content}
      </p>
      <h4>
        { creator }
      </h4>
      <ul>
        {albums()}
      </ul>
    </div>
  )
}

export default Category