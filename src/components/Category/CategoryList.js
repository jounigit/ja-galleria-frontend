import React, { useState, useEffect } from 'react'
import axios from 'axios'

import ListItem from './ListItem'
const url = 'http://localhost:8000/api/categories'

const CategoryList = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const FetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const result = await axios(url)
        setData(result.data.data)
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }
    FetchData()
  }, [])

  console.log('DATA -- ', data)

  return (
    <div>
      <h2>Kategoriat</h2>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          { data.map(category =>
            <ListItem key={category.id} category={category} />
          ) }
        </ul>
      )}
    </div>
  )
}

export default CategoryList