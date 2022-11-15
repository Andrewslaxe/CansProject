import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/cans'
let token = null

const setToken = (newToken) => {
  token = newToken
}

const getAll = async () => {
  const config = {
    headers: {"token": token},
  }
  const request = await axios.get(baseUrl, config)
  console.log(request.data)
  return request.data
}

const create = async (newObject) => {
  const config = {
    headers: {"token": token},
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (object) => {
  const config = {
    headers: {Authorization: token},
  }
  const response = await axios.delete(`${baseUrl}/${object.id}`, config)
  return response.status
}

export default {setToken, getAll, create, remove}
