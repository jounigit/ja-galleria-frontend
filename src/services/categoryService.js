import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/categories'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, getOne }