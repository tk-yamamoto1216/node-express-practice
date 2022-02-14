import axios from 'axios'
const url = 'api/post'

export const fetchAllPosts = async () => {
  const res = await axios.get('http://localhost:5000/api/post')
  return res.data
}
