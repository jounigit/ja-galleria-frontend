import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({ category }) => {
  return(
    <div>
      <h3>
        {category.title}
      </h3>
      <p>{category.content}</p>
      <Link to={`/categories/${category.id}`}>
            show
      </Link>
    </div>
  )
}

export default ListItem